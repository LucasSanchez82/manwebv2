"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { ModeToggle } from "../ui/ModeToggle";
import { ModeToggleItem } from "./profileContext/ModeToggleItem";

export function ProfileEditor({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 border rounded-lg shadow-lg p-1">
        <div className="flex flex-col space-y-1">
          <Button variant="ghost" className="justify-start text-sm font-normal py-2">
            Update Profile
          </Button>
          <Button variant="ghost" className="justify-start text-sm font-normal py-2">
            Settings
          </Button>
            <ModeToggleItem />
          <div className="h-px bg-gray-200 my-1" />
          <Button variant="ghost" className="justify-start text-sm font-normal py-2 text-red-500 hover:text-red-600 hover:bg-red-50">
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
