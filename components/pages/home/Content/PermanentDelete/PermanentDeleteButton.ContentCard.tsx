import { DialogResponsive } from '@/components/global/DialogResponsive/DialogResponsive'
import React, { PropsWithChildren } from 'react'
import { PermanentDeleteProps } from './type'
import PermanentDeleteContentForm from './PermanentDeleteForm.ContentCard'

const PermanentDeleteContentCard: React.FC<
  PropsWithChildren<PermanentDeleteProps>
> = ({ contentToPermDelete, children }) => {
  return (
    <DialogResponsive
      title="Etes vous sur de vouloir le supprimer definitivement ?"
      form={
        <PermanentDeleteContentForm contentToPermDelete={contentToPermDelete} />
      }
      buttonProps={{ variant: 'destructive' }}
    >
      {children}
    </DialogResponsive>
  )
}

export default PermanentDeleteContentCard
