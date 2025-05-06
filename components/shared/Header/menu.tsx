import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import ModeToggol from "./ModeToggol";

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
              <Button asChild variant="default">
                <Link href={"/sigh-in"}>
                  <UserIcon /> Sigh In
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
