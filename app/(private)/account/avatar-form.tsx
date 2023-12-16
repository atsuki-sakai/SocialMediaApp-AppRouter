"use client";

import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { IoPersonCircleOutline } from "react-icons/io5";

const AvatarForm = () => {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Now Loading...</div>;

  const user = data.data;

  return (
    <form>
      {user.avatar ? (
        <Image
          className="rounded-full my-3"
          width={120}
          height={120}
          src={user.avatar}
          alt={user.username}
        />
      ) : (
        <IoPersonCircleOutline />
      )}
      <input className="text-xs" type="file" />
    </form>
  );
};

export default AvatarForm;
