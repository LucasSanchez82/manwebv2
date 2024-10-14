import Feature from "@/components/pages/landing/feature/Feature";
import Hero from "@/components/pages/landing/Hero";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if(session) redirect('/home')
  return (
    <>
    <Hero />
    <Feature />
    </>
  );
}
