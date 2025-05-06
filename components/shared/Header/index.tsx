import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import ModeToggol from "./ModeToggol";
import Menu from "./menu";
const Header = () => {
  return (
    <header className="w-full border-b py-2 px-0">
      <div className="flex justify-between items-center ">
        <div className="flex justify-start items-start">
          <Link href="/" className="flex justify-start items-start">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden font-bold  text-2xl ml-3 md:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="flex justify-between space-x-2 items-center">
          <ModeToggol />
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
