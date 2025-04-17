import type { Metadata } from "next";
import "../globals.css";
import { APP_DESCRIPTION } from "@/lib/constants";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Root",
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col px-10 py-5">
      <Header />
      <main className="flex-1 flex-wrap">{children}</main>
      <Footer />
    </div>
  );
}
