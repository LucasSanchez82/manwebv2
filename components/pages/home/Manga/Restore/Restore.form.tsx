"use client";
import React from "react";
import { RestoreProps } from "./type";
import { restoreMangaAction } from "@/lib/actions/mangas.actions";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const RestoreForm: React.FC<RestoreProps> = ({ mangaToRestore }) => {
  const router = useRouter();
  const handleAction = async (r: RestoreProps["mangaToRestore"]) => {
    await restoreMangaAction(r);
    useDialog().setOpen(false);
    router.refresh();
  };
  return (
    <ButtonAction
      pendingText="En cours..."
      action={handleAction}
      actionProps={[mangaToRestore]}
    >
      Restaurer
    </ButtonAction>
  );
};

export default RestoreForm;
