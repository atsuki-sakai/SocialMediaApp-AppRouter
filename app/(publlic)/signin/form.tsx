"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  function validationCredentials(username: string, password: string) {
    const newErrors: string[] = [];

    const maxLength = 30;
    const minLength = 5;

    if (username.length > maxLength) {
      newErrors.push(
        "ユーザー名が短過ぎます。ユーザー名は30文字以内にして下さい。"
      );
    }
    if (username.length < minLength) {
      newErrors.push("ユーザー名が短過ぎます。5文字以上にして下さい。");
    }

    if (password.length > maxLength) {
      newErrors.push("パスワードが短過ぎます。30文字以内にして下さい。");
    }
    if (password.length < minLength) {
      newErrors.push("パスワードが短過ぎます。5文字以上にして下さい。");
    }
    return newErrors;
  }

  function toggleShowPassword(e: FormEvent) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setErrors([]);
    const newErrors = validationCredentials(username!, password!);
    if (newErrors.length !== 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/feed");
      } else {
        newErrors.push(
          "invalid username of password... Recheck the two fields and try again."
        );
        setErrors(newErrors);
      }
    } catch (e) {
      newErrors.push(e as string);
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 w-[360px] p-5 rounded-lg "
    >
      <div>
        <h3 className="text-center mt-3 mb-5">ログイン</h3>

        <div className="gap-2 flex flex-col mt-2 text-black">
          <div className="text-xs text-white">
            <label className="block mb-2" htmlFor="username">
              ユーザー名
            </label>
            <input
              className="block p-2 text-sm rounded-lg text-black w-full"
              autoComplete="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              className="text-blue-500 underline text-xs mt-2"
              onClick={toggleShowPassword}
            >
              {showPassword
                ? "パスワードを非表示にする"
                : "パスワードを表示にする"}
            </button>
          </div>
          <div className="text-xs text-white">
            <label className="block mb-2" htmlFor="password">
              パスワード
            </label>
            <input
              className="block p-2 text-sm rounded-lg text-black w-full"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
        </div>
        <button
          className="w-full bg-slate-900 my-8 px-2 py-4 rounded-lg text-sm hover:opacity-60 transition-all ease-in-out"
          type="submit"
          disabled={loading}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>

        {errors.length !== 0 ? (
          <div className="bg-white p-3 rounded-lg">
            {errors.map((error) => {
              return (
                <ul
                  key={error}
                  className="text-red-600 text-xs mt-2 list-disc pl-4"
                >
                  <li>{error}</li>
                </ul>
              );
            })}
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default Form;
