import { PostInfo } from "@/app/types";
import fetcher from "@/app/utils/fetcher";
import React from "react";
import Image from "next/image";
import useSWR from "swr";

const FeedList = ({ index, key }: { index: number; key: number }) => {
  const { data, error, isLoading } = useSWR(
    "/api/posts/feed?page=" + index,
    fetcher
  );

  if (error) return <div>{error}</div>;
  if (isLoading)
    return (
      <div className="p-3 flex justify-between items-start bg-white rounded-md my-5">
        <div className="h-[46px] w-[58px] rounded-full bg-gray-400" />
        <div className="w-full px-3">
          <div className="h-5 bg-gray-200 rounded-md"></div>
          <div className="h-12 bg-gray-300 mt-2 rounded-md"></div>
        </div>
      </div>
    );


  return (
    <ul className="my-5">
      {data.data.map((post: PostInfo, index: number) => {
        console.log(post);
        return (
          <li
            key={`${index}-${post.id}`}
            className="p-3 bg-white text-black rounded-md mb-3 flex gap-2"
          >
            <Image
              src={post.avatar}
              width={32}
              height={32}
              alt={post.username}
              className="h-[36px] w-[36px] rounded-full"
            />
            <div>
              <span className="block text-xs tracking-wider text-gray-500">
                {post.updated_at.split("T")[0]}
              </span>
              <p className="text-sm text-gray-800 tracking-wide">
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
