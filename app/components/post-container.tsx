import { useState } from "react";
import PostList from "./post-list";

function PostContainer({ username }: { username: string }) {
  const [cnt, setCnt] = useState(1);

  const pages = [];

  for (let i = 0; i < cnt; i++) {
    pages.push(
      <PostList index={i} username={username} key={`post-lisit-${i}`} />
    );
  }

  return (
    <div>
      {pages}
      <div className="flex justify-center items-center">
        <button
          className="bg-slate-600 px-6 py-1 rounded-sm text-[14px]"
          onClick={() => setCnt(cnt + 1)}
        >
          load more
        </button>
      </div>
    </div>
  );
}

export default PostContainer;
