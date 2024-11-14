"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchemaForm } from "../../lib/schemas/profile/profilEditorFormSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "../ui/sheet";
import SubmitActionButton from "./SubmitActionButton";
import AutoForm from "../ui/auto-form";
import { useSessionStore } from "@/lib/store/sessionStore";

type ProfileFormData = z.infer<typeof profileSchemaForm>;
type ProfileSchemaFormShape = (typeof profileSchemaForm)["shape"];
type keyOfProfileSchemaShape = keyof ProfileSchemaFormShape;

const ProfileEditorForm = () => {
  const { session } = useSessionStore();

  const fieldNames = Object.keys(
    profileSchemaForm.shape,
  ) as keyOfProfileSchemaShape[];

  const form = useForm({
    resolver: zodResolver(profileSchemaForm),
    defaultValues: {
      name: "",
      email: "",
      image: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    // Handle form submission
  };

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
