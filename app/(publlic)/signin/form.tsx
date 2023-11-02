"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/feed");
      } else {
        alert(
          "invalid username of password... Recheck the two fields and try again."
        );
      }
    } catch (e) {
      alert(`ERROR: ${e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-700 w-fit p-5 rounded-lg">
      <div>
        <h3 className="text-center my-1">Sign in</h3>
        <div>
          <hr />
        </div>
        <div className="gap-2 flex flex-col mt-2 text-black">
          <div className="text-xs text-white">
            <label className="block mb-2" htmlFor="username">
              UserName
            </label>
            <input
              className="block p-2 text-sm rounded-lg text-black"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          <div className="text-xs text-white">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="block p-2 text-sm rounded-lg text-black"
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
        </div>
        <button
          className="w-full bg-slate-900 mt-3 px-2 py-1 rounded-lg text-sm hover:opacity-60 transition-all ease-in-out"
          type="submit"
          disabled={loading}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Form;
