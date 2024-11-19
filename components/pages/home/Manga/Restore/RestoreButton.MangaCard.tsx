import { DialogResponsive } from "@/components/global/DialogResponsive/DialogResponsive";
import React from "react";
import { RestoreProps } from "./type";
import RestoreForm from "./Restore.form";

const RestoreButtonMangaCard: React.FC<RestoreProps> = ({ mangaToDelete }) => {
  return (
    <DialogResponsive
      title="Etes vous sur de vouloir le supprimmer definitivent"
      form={<RestoreForm mangaToDelete={mangaToDelete} />}
    ></DialogResponsive>
  );
};

export default RestoreButtonMangaCard;
