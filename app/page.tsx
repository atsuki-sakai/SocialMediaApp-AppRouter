import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-white">
      <div className="bg-slate-800 rounded-lg w-full max-w-sm py-12 px-5 mx-5 tracking-wider">
        <h1 className="text-center mb-5 text-lg ">Social Media App</h1>
        <Link
          className="block bg-slate-900 p-3 rounded-lg hover:bg-slate-700 transition-all text-xs ease-in-out"
          href={"/signin"}
        >
          ログインする
        </Link>
        <Link
          className="block bg-slate-900 p-3 mt-4 rounded-lg hover:bg-slate-700 transition-all text-xs ease-in-out"
          href={"/signup"}
        >
          新規登録
        </Link>
      </div>
    </div>
  );
}
