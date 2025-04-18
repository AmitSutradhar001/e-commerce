import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
const NotFound = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-slate-950 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center flex justify-center items-center flex-col">
          <Image
            src={Logo}
            alt="Logo"
            width={48}
            height={48}
            className="py-5"
          />
          <p className=" font-semibold text-2xl text-indigo-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={"/"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
