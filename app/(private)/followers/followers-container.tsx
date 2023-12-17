"use client";
import React, { useState } from "react";
import FollowerList from "./followers-list";

const FollowersContainer = () => {
  const [cnt, setCnt] = useState(1);
  const page = [];

  for (let i = 0; i < cnt; i++) {
    page.push(<FollowerList key={`folower-list-${i}`} index={i} />);
  }
  return (
    <div className="my-3">
      {page}
      <div>
        <button onClick={() => setCnt(cnt + 1)}>load more</button>
      </div>
    </div>
  );
};

export default FollowersContainer;
