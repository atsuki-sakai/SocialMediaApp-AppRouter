import React from "react";
import useSWR from "swr";
import Image from "next/image";

import type { UserInfo } from "@/app/types";

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
            <Image
              className="w-[32px] h-[32px] rounded-full"
              width={32}
              height={32}
              src={follower.avatar}
              alt={follower.username}
            />
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
