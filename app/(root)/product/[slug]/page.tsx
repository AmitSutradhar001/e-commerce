import { getProductBySlug } from "@/lib/actions/product.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/shared/Products/product-prics";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: { slug: string };
};

const ProductDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2"></div>
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-4">
              <p>
                {product?.brand} {product?.category}
              </p>
              <h1 className="font-bold text-2xl">{product?.name}</h1>
              <p className="">
                {product?.rating} of {product?.numReviews}{" "}
                <span className="text-blue-700">Reviews</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
                  value={Number(product?.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product?.description}</p>
            </div>
          </div>
          {/*Action Column*/}
          <div>
            <Card>
              <CardContent>
                <div className="mb-2 fex justify-between">
                  <div>price</div>
                  <div>
                    <ProductPrice value={Number(product?.price)} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product?.stock && product?.stock > 0 ? (
                    <Badge variant="outline">In Staock</Badge>
                  ) : (
                    <Badge variant="destructive">Out Of Stock</Badge>
                  )}
                </div>
                {product?.stock && product?.stock > 0 && (
                  <div className="flex justify-center items-center">
                    <Button className="w-full">Add To Cart</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
