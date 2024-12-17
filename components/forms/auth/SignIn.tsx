import { signIn } from '@/lib/auth/auth'
import SubmitActionButton from '../SubmitActionButton'

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <SubmitActionButton>Se connecter</SubmitActionButton>
    </form>
  )
}
