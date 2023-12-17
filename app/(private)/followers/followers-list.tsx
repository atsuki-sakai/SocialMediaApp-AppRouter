import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

import type { UserInfo } from "@/app/types";
import { WaitingLoader } from "@/app/components";

const FollowerList = ({ index }: { index: number }) => {
  const { data: userData } = useSWR("/api/users/profile");

  const { data: followers } = useSWR(
    () => "/api/users/" + userData.data.id + "/followers?page=" + index
  );

  if (!followers) {
    return (
      <div className="mt-5 mb-3">
        <WaitingLoader />
      </div>
    );
  }
  return (
    <ul>
      {followers.data.map((follower: UserInfo) => {
        return (
          <Link key={follower.id} href={`/${follower.username}`}>
            <li className="flex items-center p-2">
              {follower.avatar && (
                <Image
                  className="w-[32px] h-[32px] rounded-full"
                  width={32}
                  height={32}
                  src={follower.avatar}
                  alt={follower.username}
                />
              )}

              <p className=" text-white text-xs tracking-wide pl-3">
                {follower.username}
              </p>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default FollowerList;
