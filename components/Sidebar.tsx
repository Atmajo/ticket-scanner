import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

const Sidebar = ({ menu, setMenu }: { menu: boolean; setMenu: Function }) => {
  const pathname = usePathname();
  const router = useRouter();
  const hasAccess = Cookies.get("user") as string;
  
  useEffect(() => {
    if (!hasAccess) {
      router.push("/sign-in");
    }
  }, [hasAccess]);

  const isActive = pathname === "/" || pathname === "/tickets";

  return (
    <div className="absolute z-10 min-h-screen md:sticky left-0 top-0 flex w-fit flex-col border-none bg-gray-800 pt-8 text-white lg:w-[270px] lg:pl-8">
      <div className="flex gap-4 px-5 md:px-0 lg:px-0">
        <h1 className="text-2xl text-white font-extrabold md:px-5 lg:px-0">
          Ticket Generator
        </h1>
        <div className="md:hidden">
          <Image
            src="/close.svg"
            alt="close"
            width={30}
            height={30}
            onClick={() => setMenu(!menu)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <Link
          href="/"
          className={cn(
            "flex gap-3 items-center py-4 max-lg:px-4 justify-start max-lg:justify-center",
            {
              "bg-nav-focus border-r-4 border-orange-600": isActive,
            }
          )}
        >
          <h1>Scanner</h1>
        </Link>
        <Link
          href="/users"
          className={cn(
            "flex gap-3 items-center py-4 max-lg:px-4 justify-start max-lg:justify-center",
            {
              "bg-nav-focus border-r-4 border-orange-600": isActive,
            }
          )}
        >
          <h1>Users</h1>
        </Link>
        <h1
          onClick={() => {
            Cookies.remove("user");
            Cookies.remove("id");
            router.push("/sign-in");
          }}
          className={cn(
            "flex gap-3 items-center py-4 max-lg:px-4 justify-start max-lg:justify-center cursor-pointer",
            {
              "bg-nav-focus border-r-4 border-orange-600": isActive,
            }
          )}
        >
          Log Out
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
