import React, { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

const Form = () => {
  const { mutate } = useSWRConfig();
  const [post, setPost] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (post.length <= 0) {
      return alert("ポストを入力して下さい。");
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: post }),
    });
    if (!res.ok) {
      console.log(res);
      return alert(`status: ${res.status}`);
    }
    mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <textarea
        className="p-3 rounded-sm text-black"
        placeholder="what is happening?"
        cols={30}
        rows={10}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setPost(e.target.value)
        }
        value={post}
      />
      <button
        type="submit"
        className="my-5 py-1 px-6 w-fit rounded-sm bg-slate-600 text-[14px]"
      >
        Post
      </button>
    </form>
  );
};

export default Form;
