"use client";

import { profileSchemaForm } from "../../lib/schemas/profile/profilEditorFormSchema";
import { SheetFooter } from "../ui/sheet";
import SubmitActionButton from "./SubmitActionButton";
import AutoForm from "../ui/auto-form";
import { useSessionStore } from "@/lib/store/sessionStore";

type ProfileSchemaFormShape = (typeof profileSchemaForm)["shape"];
type keyOfProfileSchemaShape = keyof ProfileSchemaFormShape;

const ProfileEditorForm = () => {
  const { session } = useSessionStore();

  const fieldNames = Object.keys(
    profileSchemaForm.shape
  ) as keyOfProfileSchemaShape[];

  return (
    <AutoForm
      formSchema={profileSchemaForm}
      fieldConfig={{
        email: {
          inputProps: { defaultValue: session?.user?.email || undefined },
        },

        name: {
          inputProps: { defaultValue: session?.user?.name || undefined },
        },

        image: {
          inputProps: { defaultValue: session?.user?.image || undefined },
        },
      }}
    >
      <SheetFooter>
        <SubmitActionButton>Enrregistrer</SubmitActionButton>
      </SheetFooter>
    </AutoForm>
  );
};

export default ProfileEditorForm;
