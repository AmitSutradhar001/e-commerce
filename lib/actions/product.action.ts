"use server";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { PrismaClient } from "../generated/prisma";

// Creating the client
const prisma = new PrismaClient();

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}

// Get single product by its slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({ where: { slug } });

  if (!product) return null;

  return {
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
    numReviews: product.numReviews.toString(),
  };
}
