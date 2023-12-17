import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as _ from "lodash";
import { UserInfo } from "../types";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);

  // 入力後500ms待ってからAPIへリクエストを送信
  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);
  function handleChangeSearchWord(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    debouncedFetchSearchResults(e.target.value);
  }

  async function fetchSearchResults(searchWord: string) {
    try {
      if (searchWord == "") return;

      const res = await fetch("/api/search?q=" + searchWord, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const { data } = await res.json();
        setVisible(true);
        setSearchResults(data);
      } else {
        setVisible(false);
        setSearchResults([]);
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  useEffect(() => {
    const handleClickOutSide = (e: React.MouseEvent) => {
      //@ts-ignore
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("in");
        setVisible(false);
      } else {
        console.log("out");
      }
    };
    // @ts-ignore
    document.addEventListener("click", handleClickOutSide);

    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <div
      className="mt-10 text-black flex flex-row w-full justify-end relative"
      ref={ref}
    >
      <input
        className="p-2 rounded-md border text-gray-500 text-sm tracking-wide my-2 w-full focus:outline-none"
        id="search-word"
        type="text"
        placeholder="here search word."
        onChange={handleChangeSearchWord}
        onClick={() => setVisible(true)}
      />

      {visible && searchResults.length > 0 && (
        <ul className="absolute top-14 left-2 bg-white shadow-md border rounded-md">
          {searchResults.map((user) => {
            return (
              <li
                key={user.id}
                className="block border-b px-3 py-2 text-gray-500 tracking-wide font-light"
              >
                <Link
                  href={"/" + user.username}
                  onClick={() => setVisible(false)}
                >
                  <div className="flex items-center">
                    {user.avatar ? (
                      <Image
                        className="rounded-full"
                        src={user.avatar}
                        width={32}
                        height={32}
                        alt={user.username}
                      />
                    ) : (
                      <div className="w-[32px] h-[32px] rounded-full bg-gray-400" />
                    )}
                    <span className="ml-2">{user.username}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
