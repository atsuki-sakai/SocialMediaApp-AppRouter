"use client";
import useSWR from "swr";

import React from "react";
import Form from "./form";
import { PostContainer } from "@/app/components";

const Profile = () => {
  const { data: user, error, isLoading } = useSWR("/api/users/profile");

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <h2>Profile</h2>
      <Form />

      <PostContainer username={user.data.username} />
    </main>
  );
};

export default Profile;
