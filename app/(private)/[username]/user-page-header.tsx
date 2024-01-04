import { WaitingLoader } from "@/app/components";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

const UserPageHeader = ({ username }: { username: string }) => {
  const [disabled, setDisabled] = useState(false);
  const { data: loginUser } = useSWR("/api/users/profile");
  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUser,
  } = useSWR("/api/users?username=" + username);
  const {
    data: followData,
    error: followError,
    isLoading: isLoadingFollow,
  } = useSWR(() => "/api/follows?user_id=" + userData.data[0].id);

  if (followError || userError) return <div>Error</div>;
  if (isLoadingFollow || isLoadingUser || !userData)
    return (
      <div className="flex justify-between items-center h-12">
        <div className="tracking-wide uppercase">
          <span className="text-center text-xs tracking-widest">
            loading now...
          </span>
        </div>
        <div className="bg-white text-slate-800 text-sm px-3 py-1 rounded-sm tracking-wide">
          Follow
        </div>
      </div>
    );

  if (userData.data.length == 0) {
    notFound();
  }

  const user = userData.data[0];
  async function handleFollow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setDisabled(true);
    const res = await fetch("/api/follows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
    setDisabled(false);
  }

  async function handleDeleteFolllow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setDisabled(true);

    const res = await fetch("/api/follows/" + user.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
    setDisabled(false);
  }

  return (
    <header>
      <div className="flex items-center justify-between h-12">
        <p className="text-sm tracking-wide">{username}</p>
        {loginUser.data.username != username && (
          <div>
            {followData.data.length == 0 ? (
              <button
                className="bg-white text-slate-800 text-sm px-3 py-1 rounded-sm tracking-wide"
                onClick={handleFollow}
                disabled={disabled}
              >
                Follow
              </button>
            ) : (
              <button
                className="bg-slate-900 text-sm px-3 py-1 rounded-sm tracking-wide"
                onClick={handleDeleteFolllow}
                disabled={disabled}
              >
                UnFollow
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default UserPageHeader;
