'use client'
import React from 'react'
import { RestoreProps } from './type'
import { restoreContentAction } from '@/lib/actions/contents.actions'
import ButtonAction from '@/components/global/Button.action'
import { useDialog } from '@/components/global/DialogResponsive/DialogResponsive.context'
import { useRouter } from 'next/navigation'

const RestoreForm: React.FC<RestoreProps> = ({ contentToRestore }) => {
  const router = useRouter()
  const { setOpen } = useDialog()
  const handleAction = async () => {
    const result = await restoreContentAction(contentToRestore)
    setOpen(false)
    router.refresh()
    return result
  }
  return (
    <ButtonAction pendingText="En cours..." action={handleAction}>
      Restaurer
    </ButtonAction>
  )
}

export default RestoreForm
