import Profile from "@/components/pages/profile/Profile";
import { auth } from "@/lib/auth/auth";
import { getSession } from "@/lib/auth/getsession";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = getSession();
  return (
    <main className="min-w-screen h-full min-h-screen">
        <Profile />
        {children}
    </main>
  );
};

export default Layout;
