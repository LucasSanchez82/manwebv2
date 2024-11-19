"use client";
import { Button } from "../ui/button";
import { ButtonComponentProps } from "@/lib/types/ButtonComponentProps";
import useAction from "@/lib/hooks/useAction";

type ButtonActionProps<T extends (...args: unknown[]) => Promise<unknown>> =
  ButtonComponentProps & {
    pendingText?: string;
    action: T;
    actionProps: Parameters<T>;
  };
const ButtonAction = <T extends (...args: any[]) => Promise<unknown>>({
  action,
  actionProps,
  children,
  pendingText,
  ...props
}: ButtonActionProps<T>) => {
  const { pending, execute } = useAction(action);
  const handleClick = async () => {
    await execute(...actionProps);
  };
  return (
    <Button
      type="button"
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
