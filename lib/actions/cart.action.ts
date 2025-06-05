"use server";

import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { cartItemSchema, insertCartSchema } from "../validator";
import { revalidatePath } from "next/cache";

// Calculate cart prices
const calsPrice = (items: CartItem[]) => {
  const itemPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );
  const shippingPrice = round2(itemPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.18 * itemPrice);
  const totalPrice = round2(itemPrice + taxPrice + shippingPrice);
  return {
    itemPrice: itemPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Get the current sessionCartId from cookies
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found!");

    // Get current authenticated user session
    const session = await auth();
    // Extract userId if logged in, else undefined for guest users
    const userId = session?.user?.id as string | undefined;

    // Fetch existing cart (if any) for this session or user
    const cart = await getMyCart();

    // Validate incoming item data using Zod schema
    const item = cartItemSchema.parse(data);

    // Find the product in the database to check availability and details
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Product Not Found!");

    // If no cart exists, create a new one with this item
    if (!cart) {
      // Prepare new cart data validating with Zod and calculating prices
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calsPrice([item]), // Calculate itemPrice, totalPrice, tax, shipping etc.
      });

      // Save new cart to database
      await prisma.cart.create({
        data: newCart as Prisma.CartUncheckedCreateInput,
      });

      // Trigger cache or page revalidation for product page
      revalidatePath(`/product/${product.slug}`);

      // Return success message for newly added product
      return { success: true, message: `${product.name} added to cart!` };
    }

    // If cart exists, check if this product is already in the cart items
    const existingItem = (cart.items as CartItem[]).find(
      (x) => x.productId === item.productId
    );

    if (existingItem) {
      // Check if increasing quantity exceeds product stock
      if (product.stock < existingItem.qty + 1)
        throw new Error("Not enough stock!");

      // Update quantity of the existing item by 1
      const updatedItems = (cart.items as CartItem[]).map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      );

      // Update the cart in database with new items array and recalculated prices
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: updatedItems,
          ...calsPrice(updatedItems),
        },
      });
    } else {
      // If product not in cart, check stock availability for at least 1
      if (product.stock < 1) throw new Error("Not enough stock!");

      // Add the new item to existing cart items array
      const updatedItems = [...(cart.items as CartItem[]), item];

      // Update the cart with new item and recalculate prices
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: updatedItems,
          ...calsPrice(updatedItems),
        },
      });
    }

    // Revalidate the product page cache after update
    revalidatePath(`/product/${product.slug}`);

    // Return success message indicating add or update
    return {
      success: true,
      message: `${product.name} ${
        existingItem ? "updated in" : "added to"
      } cart!`,
    };
  } catch (error) {
    // Log error for debugging
    console.error(error);
    // Return failure with formatted error message
    return { success: false, message: formatError(error) };
  }
}

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemPrice: cart.itemPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found!");

    // get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found!");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found!");

    // Check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found!");

    // Check if only one im qty
    if (exist.qty === 1) {
      // Remove from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease qty
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }
    // Update cart database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calsPrice(cart.items as CartItem[]),
      },
    });
    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: `${product.name} was removed from cart!`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
