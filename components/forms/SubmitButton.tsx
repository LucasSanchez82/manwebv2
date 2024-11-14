"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "../global/Spinner";

const SubmitActionButton = ({
  children,
  pending,
}: PropsWithChildren<{ pending: boolean }>) => {
  return (
    <Button aria-disabled={pending} type="submit">
      {pending ? <Spinner /> : children || "Submit"}
    </Button>
  );
};

export default SubmitActionButton;
