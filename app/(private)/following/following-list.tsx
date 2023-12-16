import React from "react";
import useSWR from "swr";
import Image from "next/image";

import type { UserInfo } from "@/app/types";
import WatingLoader from "@/app/components/WaitingLoader/Waitingloader";
import { WaitingLoader } from "@/app/components";

function FollowingList({ index }: { index: number }) {
  const { data: userData } = useSWR("/api/users/profile");

  const { data: followerData } = useSWR(
    () => "/api/users/" + userData.data.id + "/following?page=" + index
  );

  if (!followerData) {
    return (
      <div className="mt-5 mb-3">
        <WaitingLoader />
      </div>
    );
  }

  return (
    <ul className="my-3 rounded-sm">
      {followerData.data.map((follower: UserInfo) => {
        return (
          <li key={follower.id} className="flex items-center p-2">
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
        );
      })}
    </ul>
  );
}

export default FollowingList;
