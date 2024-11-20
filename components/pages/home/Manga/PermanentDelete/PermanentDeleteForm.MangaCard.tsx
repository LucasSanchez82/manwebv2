"use client";
import React from "react";
import { PermanentDeleteProps } from "./type";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import { useRouter } from "next/navigation";
import { deleteMangaAction } from "@/lib/actions/mangas.actions";
import useAction from "@/lib/hooks/useAction";

const PermanentDeleteMangaForm: React.FC<PermanentDeleteProps> = ({
  mangaToPermDelete,
}) => {
  const router = useRouter();
  const { setOpen } = useDialog();
  const { pending, execute } = useAction(deleteMangaAction);

  const handleAction = async () => {
    const result = await execute(mangaToPermDelete);
    setOpen(false);
    router.refresh();
    return result;
  };

  return (
    <ButtonAction
      variant={"destructive"}
      pendingText="En cours..."
      action={handleAction}
      disabled={pending}
    >
      Supprimer définitivement
    </ButtonAction>
  );
};

export default PermanentDeleteMangaForm;
