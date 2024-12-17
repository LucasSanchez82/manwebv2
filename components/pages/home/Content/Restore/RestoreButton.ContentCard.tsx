import { DialogResponsive } from '@/components/global/DialogResponsive/DialogResponsive'
import React, { PropsWithChildren } from 'react'
import { RestoreProps } from './type'
import RestoreForm from './Restore.form'

const RestoreButtonContentCard: React.FC<PropsWithChildren<RestoreProps>> = ({
  contentToRestore,
  children,
}) => {
  return (
    <DialogResponsive
      title="Etes vous sur de vouloir le restaurer ?"
      form={<RestoreForm contentToRestore={contentToRestore} />}
      buttonProps={{ variant: 'outline', size: 'icon' }}
    >
      {children}
    </DialogResponsive>
  )
}

export default RestoreButtonContentCard
