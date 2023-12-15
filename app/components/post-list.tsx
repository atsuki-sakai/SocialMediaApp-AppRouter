import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { PostInfo } from "../types";

const PostList = ({ index, username }: { index: number; username: string }) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/api/posts?page=" + index + "&username=" + username);

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ul className="mt-3">
      {posts.data.map((post: PostInfo, index: number) => {
        return (
          <li key={index} className="flex bg-white mb-3 p-2 rounded-sm">
            {post.avatar ? (
              <div>
                <Image
                  className="rounded-full"
                  height={42}
                  width={42}
                  src={post.avatar}
                  alt={post.username}
                />
              </div>
            ) : (
              <div className="h-[32px] w-[32px] rounded-full bg-gray-600"></div>
            )}
            <div className="w-full h-auto ml-2">
              <div className="flex justify-between items-center text-black">
                <p className="font-bold text-sm">{post.username}</p>
                <span className="text-[10px] font-light tracking-wide text-gray-500">
                  更新日 : {post.updated_at.split("T")[0]}
                </span>
              </div>
              <p className="text-gray-600 text-sm tracking-wide">
                {post.content}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
