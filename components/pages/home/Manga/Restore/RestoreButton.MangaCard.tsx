import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import React, { PropsWithChildren } from "react";
import { RestoreProps } from "./type";
import RestoreForm from "./Restore.form";

const RestoreButtonMangaCard: React.FC<PropsWithChildren<RestoreProps>> = ({
  mangaToRestore,
  children,
}) => {
  return (
    <DialogResponsive
      title="Etes vous sur de vouloir le restaurer ?"
      form={<RestoreForm mangaToRestore={mangaToRestore} />}
      buttonProps={{ variant: "outline", size: "icon" }}
    >
      {children}
    </DialogResponsive>
  );
};

export default RestoreButtonMangaCard;
