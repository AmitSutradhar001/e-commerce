import { PrismaClient } from "../lib/generated/prisma";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.product.deleteMany();
    await prisma.product.createMany({ data: sampleData.products });
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
