import React, { useState } from "react";
import useSWR, { mutate } from "swr";

const UserPageHeader = ({ username }: { username: string }) => {
  const [disabled, setDisabled] = useState(false);
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
  if (isLoadingFollow || isLoadingUser) return <div>Loading...</div>;

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
      alert("follow");
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
      alert("unfollow");
    }
    setDisabled(false);
  }

  return (
    <header>
      <div>
        <h1>{username}</h1>
        {followData.data.length == 0 ? (
          <button onClick={handleFollow} disabled={disabled}>
            Follow
          </button>
        ) : (
          <button onClick={handleDeleteFolllow} disabled={disabled}>
            UnFollow
          </button>
        )}
      </div>
    </header>
  );
};

export default UserPageHeader;
