"use client";

import React from "react";
import UserPageHeader from "./user-page-header";
import { PostContainer } from "@/app/components";

const UserPage = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <PostContainer username={params.username} showEditBtn={false} />
    </div>
  );
};

export default UserPage;
