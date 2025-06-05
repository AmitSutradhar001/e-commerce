import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ModeToggol from "./ModeToggol";
import UserButton from "./user-button";
// import UserButton from "./user-button";

const Menu = () => {
  return (
    <>
      <div className="flex justify-end gap-3">
        <nav className="hidden md:flex w-full max-xs gap-1">
          <Button asChild variant="ghost">
            <Link href={"/cart"}>
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <UserButton />
        </nav>
        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle">
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start px-5">
              <SheetTitle>Menu</SheetTitle>
              <ModeToggol />
              <Button asChild>
                <Link href={"/cart"}>
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <UserButton />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
