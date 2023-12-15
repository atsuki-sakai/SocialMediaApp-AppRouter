import React from "react";
import useSWR from "swr";
import Image from "next/image";

import type { UserInfo } from "@/app/types";
import { UserIcon } from "@heroicons/react/20/solid";

const FollowerList = ({ index }: { index: number }) => {
  const { data: userData } = useSWR("/api/users/profile");

  const { data: followers } = useSWR(
    () => "/api/users/" + userData.data.id + "/followers?page=" + index
  );

  if (!followers) {
    return <div>now loading...</div>;
  }
  return (
    <ul>
      {followers.data.map((follower: UserInfo) => {
        return (
          <li key={follower.id} className="flex items-center p-2">
            {follower.avatar ? (
              <Image
                className="w-[32px] h-[32px] rounded-full"
                width={32}
                height={32}
                src={follower.avatar}
                alt={follower.username}
              />
            ) : (
              <div className="bg-gray-500 p-2 rounded-full w-[32px] h-[32px] flex justify-center items-center">
                <UserIcon width={20} height={20} />
              </div>
            )}

            <p className=" text-white text-xs tracking-wide pl-3">
              {follower.username}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default FollowerList;
