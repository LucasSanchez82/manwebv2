
import { signIn } from "@/lib/auth"
import SubmitButton from "../SubmitButton"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <SubmitButton>Se connecter</SubmitButton>
    </form>
  )
} 