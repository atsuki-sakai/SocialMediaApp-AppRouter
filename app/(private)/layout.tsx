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
      <div>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
