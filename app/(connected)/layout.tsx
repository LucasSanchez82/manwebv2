import NavBar from "@/components/navbar/Navbar";
import Profile from "@/components/profile/Profile";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) return redirect("/se-connecter");
  {
    /* <NavBar /> */
  }
  return (
    <main className="w-full h-full min-h-screen">
        <Profile />
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Manweb
      </h1>

    </main>
  );
};

export default Layout;
