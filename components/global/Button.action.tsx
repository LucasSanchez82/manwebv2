"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { ButtonComponentProps } from "@/lib/types/ButtonComponentProps";
import useAction from "@/lib/hooks/useAction";

const ButtonAction = ({
  children,
  pendingText,
  action,
  ...props
}: ButtonComponentProps & {
  pendingText?: string;
  action: (...args: unknown[]) => Promise<unknown>;
}) => {
  const { pending, execute } = useAction(action);
  const handleClick = async () => {
    await execute();
  };
  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      {...props}
      onClick={handleClick}
    >
      {pending ? (pendingText ?? "Loading...") : (children ?? "Submit")}
    </Button>
  );
};

export default ButtonAction;
