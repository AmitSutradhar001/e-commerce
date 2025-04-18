import { APP_DESCRIPTION } from "@/lib/constants";
import { Metadata } from "next";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Home",
  description: APP_DESCRIPTION,
};

const HomePage = () => {
  return (
    <>
      <Loading />
    </>
  );
};

export default HomePage;
