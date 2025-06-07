"use client";

import { useState } from "react";
import { Cart, CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useTransition } from "react";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRemove = async (productId: string) => {
    setLoadingId(productId);
    const res = await removeItemFromCart(productId);
    if (!res.success) toast(res.message);
    setLoadingId(null);
  };

  const handleAdd = async (item: CartItem) => {
    setLoadingId(item.productId);
    const res = await addItemToCart(item);
    if (!res.success) toast(res.message);
    setLoadingId(null);
  };

  return (
    <>
      <h1 className="py-4 text-2xl font-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href={"/"} className="text-blue-600 text-xl">
            Go Shopping!
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-4">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex items-center justify-center gap-3">
                      <Button
                        disabled={loadingId === item.productId}
                        variant={"outline"}
                        type="button"
                        onClick={() => handleRemove(item.productId)}
                      >
                        {loadingId === item.productId ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={loadingId === item.productId}
                        variant={"outline"}
                        type="button"
                        onClick={() => handleAdd(item)}
                      >
                        {loadingId === item.productId ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">₹ {item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):{" "}
                <span className="font-bold">
                  {formatCurrency(cart.itemPrice)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push("/shipping-address"))
                }
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
