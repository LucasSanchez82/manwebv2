import { signOut } from '@/lib/auth/auth'
import React, { PropsWithChildren } from 'react'
import SubmitActionButton from '../SubmitActionButton'
import { ButtonComponentProps } from '@/lib/types/ButtonComponentProps'

type SignOutProps = PropsWithChildren<ButtonComponentProps>
const SignOut = ({ children, ...button }: SignOutProps) => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <SubmitActionButton {...button}>
        {children || 'Se déconnecter'}
      </SubmitActionButton>
    </form>
  )
}

export default SignOut
