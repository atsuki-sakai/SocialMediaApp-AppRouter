import { useRouter } from "next/navigation";
import type { PostInfo } from "@/app/types";
import { useState } from "react";

export default function DeleteBtn({ post }: { post: PostInfo }) {
  const router = useRouter();
  const [state, setState] = useState({ showConfirm: false });

  async function handleDeletePost() {
    const res = await fetch("/api/posts/" + post.id, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/profile");
    }
  }

  function handleClick() {
    const newState = Object.assign({}, state, {
      showConfirm: !state.showConfirm,
    });

    setState(newState);
  }

  return (
    <div className="my-3">
      {!state.showConfirm && (
        <button className="text-red-400" onClick={handleClick}>
          Delete Post
        </button>
      )}
      {state.showConfirm && (
        <div>
          <p>Are yout sure you want to delete this post?</p>
          <div className="flex flex-row gap-10">
            <button className="text-red-400" onClick={handleDeletePost}>
              Yes
            </button>
            <button className="text-blue-400" onClick={handleClick}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
