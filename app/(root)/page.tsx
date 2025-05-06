import { APP_DESCRIPTION } from "@/lib/constants";
import { Metadata } from "next";
import ProductList from "@/components/shared/Products/product-list";
import sampleData from "@/db/sample-data";

export const metadata: Metadata = {
  title: "Home",
  description: APP_DESCRIPTION,
};

const HomePage = () => {
  // console.log(sampleData);

  return (
    <>
      <ProductList data={sampleData.products} title="Product List" limit={4} />
    </>
  );
};

export default HomePage;
