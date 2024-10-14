"use server"
import { auth } from "./auth";

export const getSession = async () => {
  const session = await auth();
  if (!session) throw new Error("Vous n'êtes pas connecté");
  return session;
};
