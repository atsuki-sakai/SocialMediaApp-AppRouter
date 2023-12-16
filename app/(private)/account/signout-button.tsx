"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
  const router = useRouter();

  async function handleSignout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("sign out");
      router.replace("/");
    }
  }
  return (
    <button
      className="bg-slate-900 px-5 py-1.5 rounded-sm mt-5"
      onClick={handleSignout}
    >
      Sign out
    </button>
  );
};

export default SignoutButton;
