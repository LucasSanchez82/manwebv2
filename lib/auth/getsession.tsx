"use server";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const getSession = async () => {
  const session = await auth();

  if (!session?.user?.id || !session) redirect("/se-connecter");
  return session;
};
