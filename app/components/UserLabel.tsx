import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { UserInfo } from "../types";

const UserLabel = ({ user, href }: { user: UserInfo; href: string }) => {
  console.log(user);
  return (
    <div className="flex items-center">
      <Link href={href} className="flex flex-row items-center">
        <div>
          {user.avatar && (
            <div className="w-[32px] h-[32px]">
              <Image
                className="rounded-full"
                src={user.avatar}
                width={32}
                height={32}
                alt={user.username}
              />
            </div>
          )}
        </div>
      </Link>
      <p className="pl-3 text-sm font-light tracking-wider">{user.username}</p>
    </div>
  );
};

export default UserLabel;
