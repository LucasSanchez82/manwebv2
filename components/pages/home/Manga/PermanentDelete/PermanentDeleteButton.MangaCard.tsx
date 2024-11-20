import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import React, { PropsWithChildren } from "react";
import { PermanentDeleteProps } from "./type";
import PermanentDeleteMangaForm from "./PermanentDeleteForm.MangaCard";

const PermanentDeleteMangaCard: React.FC<
  PropsWithChildren<PermanentDeleteProps>
> = ({ mangaToPermDelete, children }) => {
  return (
    <DialogResponsive
      title="Etes vous sur de vouloir le supprimer definitivement ?"
      form={<PermanentDeleteMangaForm mangaToPermDelete={mangaToPermDelete} />}
      buttonProps={{ variant: "destructive" }}
    >
      {children}
    </DialogResponsive>
  );
};

export default PermanentDeleteMangaCard;
