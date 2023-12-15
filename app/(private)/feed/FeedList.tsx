import { PostInfo } from "@/app/types";
import fetcher from "@/app/utils/fetcher";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { UserIcon } from "@heroicons/react/20/solid";

const FeedList = ({ index }: { index: number }) => {
  const { data, error, isLoading } = useSWR(
    "/api/posts/feed?page=" + index,
    fetcher
  );

  function generateDammyPosts() {
    const posts = [];
    for (let i = 0; i < 6; i++) {
      posts.push(
        <div
          key={`dammy-post-${i}`}
          className="p-3 flex justify-between items-start bg-white rounded-md my-5"
        >
          <div className="h-[46px] w-[54px] rounded-full bg-gray-400" />
          <div className="w-full px-3">
            <div className="h-4 bg-gray-200 rounded-md w-[80px]"></div>
            <div className="h-8 bg-gray-300 mt-2 rounded-md"></div>
          </div>
        </div>
      );
    }
    return <div>{posts}</div>;
  }

  if (error) return <div>{error}</div>;
  if (isLoading) return generateDammyPosts();
  return (
    <ul>
      {data.data.map((post: PostInfo) => {
        return (
          <li
            key={post.id}
            className="p-3 bg-white text-black rounded-md mb-3 flex gap-2 w-full"
          >
            {post.avatar ? (
              <Image
                src={post.avatar}
                width={54}
                height={54}
                alt={post.username}
                className="h-[54px] w-[54px] rounded-full"
              />
            ) : (
              <div className="bg-gray-500 p-2 rounded-full w-[32px] h-[32px] flex justify-center items-center">
                <UserIcon width={20} height={20} />
              </div>
            )}

            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="text-sm tracking-wide">{post.username}</p>
                <span className="block text-xs tracking-wider text-gray-500">
                  {post.updated_at.split("T")[0]}
                </span>
              </div>
              <p className="text-xs text-gray-600 tracking-wide">
                {post.content}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FeedList;
