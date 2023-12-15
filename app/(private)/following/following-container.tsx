"use client";

import React, { useState } from "react";
import FollowingList from "./following-list";

const FollowingContainer = () => {
  const [cnt, setCnt] = useState(1);
  const pages = [];

  for (let i = 0; i < cnt; i++) {
    pages.push(<FollowingList key={`following-list-${i}`} index={i} />);
  }

  return (
    <div>
      {pages}
      <div>
        <button onClick={() => setCnt(cnt + 1)}>Load More</button>
      </div>
    </div>
  );
};

export default FollowingContainer;
