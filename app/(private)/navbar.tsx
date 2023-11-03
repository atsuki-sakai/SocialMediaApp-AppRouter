import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // ※ - 必ず存在するページのパスを指定して下さい。- ※
  const navPathArray = ["/feed", "/profile", "/following", "/followers"];

  return (
    <nav className="bg-slate-800 p-3 my-5 rounded-md">
      <ul className="flex justify-around items-center text-xs md:text-sm py-2 w-full">
        {navPathArray.map((path) => (
          <li key={path.replaceAll("/", "")}>
            <Link
              className={`
            ${"transition-all ease-in-out duration-500 p-2 tracking-wider"}
              ${pathname.startsWith(path) ? "text-yellow-500" : "text-white"}
              `}
              href={path}
            >
              {path.replaceAll("/", "").charAt(0).toUpperCase() +
                path.replaceAll("/", "").slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
