"use client";

import React from "react";
import useSWR from "swr";
import { WaitingLoader, UserLabel } from "@/app/components";

const Header = () => {
  const {
    data: userRes,
    error: userError,
    isLoading,
  } = useSWR("/api/users/profile");

  // if (userError) return <div>failed to {userError}</div>;
  // if (!userRes || isLoading) return <div>loading</div>;

  // console.log("userRes: ", userRes);

  return (
    <header className="h-[60px] w-full p-5 bg-slate-900 fixed top-0 left-0 right-0">
      <div className="flex flex-row justify-between items-center max-w-md mx-auto">
        <h1 className=" blockfont-mono">Social Media App</h1>
        {isLoading || !userRes ? (
          <WaitingLoader />
        ) : (
          <UserLabel user={userRes.data} href={"/account"} />
        )}
      </div>
    </header>
  );
};

export default Header;
