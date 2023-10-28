import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-white">
      <div className="bg-slate-700 rounded-lg w-full max-w-sm py-12 px-5">
        <h1 className="text-center mb-5 text-lg font-semibold">
          Social Media App
        </h1>
        <Link
          className="block bg-slate-500 p-3 rounded-lg hover:bg-slate-400 transition-all ease-in-out"
          href={"/signin"}
        >
          Sign In
        </Link>
        <Link
          className="block bg-slate-500 p-3 mt-4 rounded-lg hover:bg-slate-400 transition-all ease-in-out"
          href={"/signup"}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
