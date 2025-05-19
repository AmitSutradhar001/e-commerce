import { APP_DESCRIPTION } from "@/lib/constants";
import { Metadata } from "next";
import ProductList from "@/components/shared/Products/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

export const metadata: Metadata = {
  title: "Home",
  description: APP_DESCRIPTION,
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Product List" />
    </>
  );
};

export default HomePage;
