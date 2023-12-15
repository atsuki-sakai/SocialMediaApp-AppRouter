"use client";

import React from "react";
import useSWR from "swr";
import { WaitingLoader, UserLabel } from "@/app/components";
import { UserIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const {
    data: userRes,
    error: userError,
    isLoading,
  } = useSWR("/api/users/profile");

  if (userError) return <div>failed to {userError}</div>;
  if (isLoading) return <div>now loading...</div>;

  return (
    <header className="h-[60px] w-full p-5 bg-slate-900 fixed top-0 left-0 right-0">
      <div className="flex flex-row justify-between items-center max-w-md mx-auto">
        <h1 className=" blockfont-mono">Social Media App</h1>

        {userRes.data ? (
          <UserLabel user={userRes.data} href="/" />
        ) : (
          <div className="flex items-center">
            <div className="bg-gray-500 p-2 rounded-full w-[32px] h-[32px] flex justify-center items-center mr-4">
              <UserIcon width={20} height={20} />
            </div>
            <WaitingLoader />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
