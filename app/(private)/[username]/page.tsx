"use client";

import React from "react";
import UserPageHeader from "./user-page-header";
import useSWR from "swr";

const UserPage = ({ params }: { params: { username: string } }) => {
  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUser,
  } = useSWR("/api/users?username=" + params.username);
  const {
    data: followData,
    error: followError,
    isLoading: isLoadingFollow,
  } = useSWR(() => "/api/follows?user_id=" + userData.data[0].id);

  if (followError || userError) return <div>Error</div>;
  if (isLoadingFollow || isLoadingUser) return <div>Loading...</div>;

  return (
    <div>
      <UserPageHeader username={params.username} />
      <div>posts container {params.username}</div>
    </div>
  );
};

export default UserPage;
