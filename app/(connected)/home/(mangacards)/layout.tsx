import SearchMangaBar from "@/components/pages/home/SearchMangaBar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <SearchMangaBar />
      {children}
    </div>
  );
};

export default Layout;
