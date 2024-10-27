"use client";

import { CSSProperties, ReactNode, useState, type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import ProfileEditorForm from "@/components/forms/ProfileEditorForm";
type ButtonProps = React.ComponentProps<typeof Button>;
type DialogResponsiveProps = PropsWithChildren<{
  title: string;
  desc?: string;
  form: ReactNode;
  buttonProps?: ButtonProps;
  className?: string;
  style?: CSSProperties;
}>;
export function DialogResponsive({
  title,
  desc,
  children,
  form,
  buttonProps,
  className,
  style,
}: DialogResponsiveProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button {...buttonProps}>{children}</Button>
        </DialogTrigger>
        <DialogContent className={`sm:max-w-[425px] ${className }`} style={style}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {desc && <DialogDescription>{desc}</DialogDescription>}
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DrawerTrigger>
      <DrawerContent className={className} style={style}>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {desc && <DrawerDescription>{desc}</DrawerDescription>}
        </DrawerHeader>
        {form}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">abandonner</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
