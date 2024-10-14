import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import ProfileEditorForm from "../../forms/ProfileEditorForm";
import { DialogResponsive } from "../../ui/DialogResponsive.custom";
import { ModeToggleItem } from "./profileContext/ModeToggleItem";
import SignOut from "../../forms/auth/SignOut";

export function ProfileSettingsPopover({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 border rounded-lg shadow-lg p-1">
        <div className="flex flex-col space-y-1">
          <DialogResponsive
            form={<ProfileEditorForm />}
            title="Modifier mon profil"
            button={{
              variant: "ghost",
              className: "justify-start text-sm font-normal py-2",
            }}
          >
            Modifier mon profil
          </DialogResponsive>

          {/* <Button
            variant="ghost"
            className="justify-start text-sm font-normal py-2"
          >
            Settings
          </Button> */}

          <ModeToggleItem />
          <hr />
          <SignOut  
            variant="ghost"
            className="w-full text-center text-sm font-normal py-2 text-red-500 hover:text-red-600 hover:bg-red-50"/>
        </div>
      </PopoverContent>
    </Popover>
  );
}
