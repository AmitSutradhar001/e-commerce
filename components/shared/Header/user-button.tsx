import { auth } from "@/auth";
import Link from "next/link";
import { signOutUser } from "@/lib/actions/users.actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";

const UserButton = async () => {
  const session = await auth();
  if (!session) {
    return (
      <>
        <Button asChild>
          <Link href="/sign-in">
            <UserIcon />
            Sign In
          </Link>
        </Button>
      </>
    );
  }
  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <div className="relative flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="fllex items-center">
              <Button
                variant="ghost"
                className="relative w-8 h-8 rounded-full ml-2 flex justify-center items-center bg-gray-200 border-[1px] border-blue-500 dark:border-pink-500 dark:bg-[#020618]"
              >
                {firstInitial}
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute md:relative w-52 border-2 border-blue-300 bg-white mt-2 p-2 rounded-sm dark:border-pink-500 dark:bg-[#020618]"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-muted-foreground leading-none p-2">
                  {session.user?.name}
                </div>
                <div className="text-sm text-muted-foreground leading-none p-2">
                  {session.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="p-2 mb-1">
              <form action={signOutUser}>
                <Button className="w-full py-4 px-2 h-4 justify-start">
                  Sign Out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default UserButton;
