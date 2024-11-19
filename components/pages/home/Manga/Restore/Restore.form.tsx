"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { RestoreProps } from "./type";

const RestoreForm: React.FC<RestoreProps> = () => {
  const handleAction = async () => {};
  return (
    <Button variant={"destructive"} onClick={handleAction}>
      Supprimer le manga
    </Button>
  );
};

export default RestoreForm;
