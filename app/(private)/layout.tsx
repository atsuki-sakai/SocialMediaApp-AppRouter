"use client";

import { SWRConfig } from "swr";
import { Header, Footer, Navbar } from ".";
import fetcher from "../utils/fetcher";
import SearchBar from "./search-bar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <div className="flex flex-col min-h-screen max-w-md m-auto pt-[50px]">
        <SearchBar />
        <Header />
        <Navbar />
        <main className="bg-slate-800 p-5 rounded-md ">{children}</main>
      </div>
      <Footer />
    </SWRConfig>
  );
}
