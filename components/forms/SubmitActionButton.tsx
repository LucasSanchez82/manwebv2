"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "../global/Spinner";
import { ButtonComponentProps } from "@/lib/types/ButtonComponentProps";


const SubmitActionButton = ({ children, ...button }: ButtonComponentProps) => {
  const { pending } = useFormStatus();
  return (
    <Button {...button} aria-disabled={pending} type="submit">
      {pending ? <Spinner /> : children || "Submit"}
    </Button>
  );
};

export default SubmitActionButton;
