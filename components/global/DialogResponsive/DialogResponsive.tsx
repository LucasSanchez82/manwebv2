// DialogResponsive.custom.tsx
'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { DialogProvider, useDialog } from './DialogResponsive.context'
import { ScrollArea } from '@/components/ui/scroll-area'

type DialogResponsiveProps = {
  title: string
  desc?: string
  children?: React.ReactNode
  form: React.ReactNode
  buttonProps?: React.ComponentProps<typeof Button>
  className?: string
  style?: React.CSSProperties
}

function DialogResponsiveContent({
  title,
  desc,
  children,
  form,
  buttonProps,
  className,
  style,
}: DialogResponsiveProps) {
  const { open, setOpen } = useDialog()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // if (isDesktop) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...buttonProps}>{children}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`} style={style}>
        <ScrollArea className="max-h-[calc(100vh-4rem)]">
          <DialogHeader>
            <DialogTitle className="mb-2">{title}</DialogTitle>
            {desc && <DialogDescription>{desc}</DialogDescription>}
          </DialogHeader>
          {form}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
  // }

  // return (
  //   <Drawer open={open} onOpenChange={setOpen}>
  //     <DrawerTrigger asChild>
  //       <Button variant="outline">{children}</Button>
  //     </DrawerTrigger>
  //     <DrawerContent className={className} style={style}>
  //       <DrawerHeader className="text-left">
  //         <DrawerTitle>{title}</DrawerTitle>
  //         {desc && <DrawerDescription>{desc}</DrawerDescription>}
  //       </DrawerHeader>
  //       {form}
  //       <DrawerFooter className="pt-2">
  //         <DrawerClose asChild>
  //           <Button variant="outline">abandonner</Button>
  //         </DrawerClose>
  //       </DrawerFooter>
  //     </DrawerContent>
  //   </Drawer>
  // )
}

export function DialogResponsive(props: DialogResponsiveProps) {
  return (
    <DialogProvider>
      <DialogResponsiveContent {...props} />
    </DialogProvider>
  )
}
