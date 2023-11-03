import fetcher from "@/app/utils/fetcher";
import React from "react";
import useSWR from "swr";

const Feed = () => {
  // const { data: feeds, error, isLoading } = useSWR("/api/posts/feed", fetcher);

  // if (error) return <div>{error}</div>;
  // if (isLoading) return <div>loading now...</div>;
  return (
    <main>
      <h2>Feed</h2>
      {/* {feeds.map((feed: any) => {
        return <div key={feed.id}>{feed.username}</div>;
      })} */}
    </main>
  );
};

export default Feed;
