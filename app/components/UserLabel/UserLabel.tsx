import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { UserInfo } from "../../types";
import { UserIcon } from "@heroicons/react/24/solid";

const UserLabel = ({ user, href }: { user: UserInfo; href?: string }) => {
  return (
    <div className="flex items-center">
      <p className="pr-5 text-sm font-light tracking-wider">{user.username}</p>
      <Link
        href={`/${href || user.username}`}
        className="flex flex-row items-center"
      >
        <div>
          {user.avatar ? (
            <Image
              className="rounded-full"
              src={user.avatar}
              width={36}
              height={36}
              alt={user.username}
            />
          ) : (
            <div className="bg-gray-500 p-2 rounded-full w-[32px] h-[32px] flex justify-center items-center">
              <UserIcon width={20} height={20} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default UserLabel;
