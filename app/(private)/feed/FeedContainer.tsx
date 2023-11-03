"use client";
import React, { useState } from "react";
import FeedList from "./FeedList";

const FeedContainer = () => {
  const [count, setCount] = useState(1);
  const pages = [];
  for (let i = 0; i < count; i++) {
    pages.push(<FeedList index={i} key={i} />);
  }
  return (
    <div>
      {pages}
      <div>
        <button onClick={() => setCount(count + 1)}>Load More</button>
      </div>
    </div>
  );
};

export default FeedContainer;
