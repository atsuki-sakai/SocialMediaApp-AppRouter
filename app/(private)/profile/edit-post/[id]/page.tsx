"use client";

import useSWR from "swr";
import Form from "./form";
import DeleteBtn from "./delete-btn";

export default function EditPost({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useSWR("/api/posts/" + params.id);

  if (error) return <div>failed to load...</div>;
  if (isLoading) return <div>loading...</div>;

  if (data && !data.data) return <div>data is not defined...</div>;
  const post = data.data;
  return (
    <div>
      <h2>Edit Post</h2>
      <Form post={post} />
      <DeleteBtn post={post} />
    </div>
  );
}
