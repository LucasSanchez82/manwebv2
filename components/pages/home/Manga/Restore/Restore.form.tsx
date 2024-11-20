"use client";
import React from "react";
import { RestoreProps } from "./type";
import { restoreMangaAction } from "@/lib/actions/mangas.actions";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import { useRouter } from "next/navigation";

const RestoreForm: React.FC<RestoreProps> = ({ mangaToRestore }) => {
  const router = useRouter();
  const { setOpen } = useDialog();
  const handleAction = async () => {
    const result = await restoreMangaAction(mangaToRestore);
    setOpen(false);
    router.refresh();
    return result;
  };
  return (
    <ButtonAction pendingText="En cours..." action={handleAction}>
      Restaurer
    </ButtonAction>
  );
};

export default RestoreForm;
