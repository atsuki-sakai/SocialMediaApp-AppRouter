"use client";

import { SWRConfig } from "swr";
import { Header, Footer, Navbar } from ".";
import fetcher from "../utils/fetcher";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <Header />
      <div className="flex flex-col min-h-screen max-w-md m-auto">
        <div className="pt-[50px] px-4 my-4 min-h-screen">
          <Navbar />
          <main className="bg-slate-800 p-5 rounded-md ">{children}</main>
        </div>
      </div>
      <Footer />
    </SWRConfig>
  );
}
