import React from "react";
import { ContextMenuTrigger } from "@/components/ui/context-menu";

const ProfileContextTrigger = ({ children }: { children: React.ReactNode }) => {
  return <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>;
};

export default ProfileContextTrigger;
