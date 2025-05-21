"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  const handleClick = (index: number) => {
    setCurrent(index);
  };
  return (
    <>
      <div className="space-y-4">
        <Image
          src={images[current]}
          alt="product image"
          width={500}
          height={500}
          className="max-h-[400px] w-auto object-cover object-center"
        />
        <div className="flex gap-4">
          {images?.map((image, index) => (
            <div
              key={index}
              className={cn(
                "border mr-2 cursor-pointer hover:border-orange-500 rounded-md p-2",
                current === index && "border-red-400"
              )}
              onClick={() => handleClick(index)}
            >
              <Image src={image} alt="image" width={100} height={100} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImages;
