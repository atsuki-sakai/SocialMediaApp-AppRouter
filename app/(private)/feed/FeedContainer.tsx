"use client";
import React, { useState } from "react";
import FeedList from "./FeedList";

const FeedContainer = () => {
  const [count, setCount] = useState(1);
  const pages = [];
  for (let i = 0; i < count; i++) {
    pages.push(<FeedList key={`feed-list-${i}`} index={i} />);
  }
  return (
    <div>
      {pages}
      <div className="mt-3 w-full flex justify-center">
        <button
          className="bg-slate-900 tracking-wider text-white w-full py-3 rounded-md text-sm"
          onClick={() => setCount(count + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default FeedContainer;
