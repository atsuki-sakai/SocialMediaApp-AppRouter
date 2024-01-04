import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { PostInfo } from "../types";

const PostList = ({
  index,
  username,
  showEditBtn,
}: {
  index: number;
  username: string;
  showEditBtn: boolean;
}) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/api/posts?page=" + index + "&username=" + username);

  if (error) {
    return <div>Error...</div>;
  }
  if (isLoading || !posts) {
    return (
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-3 flex justify-between items-start bg-white rounded-md my-3"
          >
            <div className="h-[46px] w-[54px] rounded-full bg-gray-400" />
            <div className="w-full px-3">
              <div className="h-4 bg-gray-200 rounded-md w-[80px]"></div>
              <div className="h-8 bg-gray-300 mt-2 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="mt-3">
      {posts.data.map((post: PostInfo, index: number) => {
        return (
          <li
            key={post.id + "-" + post.username}
            className="relative flex bg-white mb-3 p-2 rounded-sm"
          >
            {post.avatar && (
              <div>
                <Image
                  className="rounded-full"
                  height={42}
                  width={42}
                  src={post.avatar}
                  alt={post.username}
                />
              </div>
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
              {showEditBtn && (
                <div className="flex justify-end">
                  <Link
                    href={`/profile/edit-post/${post.id}`}
                    className="bg-slate-800 px-3 py-1 rounded-sm text-xs tracking-wider"
                  >
                    <span>Edit</span>
                  </Link>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
