"use client";

import React from "react";
import useSWR from "swr";
import { WaitingLoader, UserLabel } from "@/app/components";
import { UserIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>failed to {error}</div>;

  return (
    <header className="flex flex-row h-[60px] w-full p-5 bg-slate-800 justify-between items-center">
      <div>
        <h1 className="font-mono">Social Media App</h1>
      </div>
      <div>
        {isLoading ? (
          <div className="flex items-center">
            <WaitingLoader />
            <div className="bg-gray-500 p-2 rounded-full w-[32px] h-[32px] flex justify-center items-center ml-8">
              <UserIcon width={20} height={20} />
            </div>
          </div>
        ) : (
          <UserLabel user={data.data} href="/account" />
        )}
      </div>
    </header>
  );
};

export default Header;
