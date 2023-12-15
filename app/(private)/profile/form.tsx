import React, { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

const Form = () => {
  const { mutate } = useSWRConfig();
  const [post, setPost] = useState("");
  const [errors, setErrors] = useState<Error[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errors = validPost(post);
    if (errors.length != 0) {
      return setErrors(errors);
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: post }),
    });
    if (!res.ok) {
      return alert(`status: ${res.status}`);
    }
    mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
    setErrors([]);
    setPost("");
  }

  function validPost(post: string) {
    const errors = [];
    if (post === "") {
      errors.push(Error("ポストを入力して下さい。"));
    }
    if (post.length >= 200) {
      errors.push(Error("投稿は200文字以内にして下さい。"));
    }
    return errors;
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
      <ul className="list-disc pl-5 bg-red-100 rounded-sm">
        {errors.map((error, index) => {
          return (
            <li key={index} className="text-red-500 text-[10px] my-2">
              {error.message}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default Form;
