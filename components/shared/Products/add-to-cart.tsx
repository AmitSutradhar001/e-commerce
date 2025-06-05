"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { useTransition } from "react";

const AddCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast(res.message);
        return;
      }
      // Handle success add to cart
      toast(res.message, {
        action: {
          label: "Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  // Check if item is in ccart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  // Handle remove functtion
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast(res.message);
      return;
    });
  };

  return existItem ? (
    <>
      <div className="">
        <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="px-2">{existItem.qty}</span>
        <Button type="button" variant="outline" onClick={handleAddToCart}>
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  ) : (
    <>
      <Button className="w-full" type="button" onClick={handleAddToCart}>
        <Plus /> Add To Cart
      </Button>
    </>
  );
};

export default AddCart;
