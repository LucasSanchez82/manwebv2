"use client";
import React from "react";
import { PermanentDeleteProps } from "./type";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import { useRouter } from "next/navigation";
import { deleteContentAction } from "@/lib/actions/contents.actions";
import useAction from "@/lib/hooks/useAction";

const PermanentDeleteContentForm: React.FC<PermanentDeleteProps> = ({
  contentToPermDelete,
}) => {
  const router = useRouter();
  const { setOpen } = useDialog();
  const { pending, execute } = useAction(deleteContentAction);

  const handleAction = async () => {
    const result = await execute(contentToPermDelete);
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

export default PermanentDeleteContentForm;
