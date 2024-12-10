import SearchContentBar from "@/components/pages/home/SearchContentBar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <SearchContentBar />
      {children}
    </div>
  );
};

export default Layout;
