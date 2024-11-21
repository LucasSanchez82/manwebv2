"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { ButtonComponentProps } from "@/lib/types/ButtonComponentProps";
import useAction from "@/lib/hooks/useAction";
import { toast } from "sonner";

const ButtonAction = ({
  children,
  pendingText,
  action,
  ...props
}: ButtonComponentProps & {
  pendingText?: string;
  action: (...args: unknown[]) => Promise<any>;
}) => {
  const { pending, execute } = useAction(action);
  const handleClick = async () => {
    const result = await execute();
    console.log("result", result);
    if (result) {
      if ("data" in result && "message" in result.data) {
        toast.success(result.data.message);
      } else if ("error" in result) {
        toast.error(result.error);
      }
    }
  };

  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      type="button"
      {...props}
      onClick={handleClick}
    >
      {pending ? (pendingText ?? "Loading...") : (children ?? "Submit")}
    </Button>
  );
};

export default ButtonAction;
