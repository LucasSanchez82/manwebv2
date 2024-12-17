import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import ProfileEditorForm from '../../forms/ProfileEditorForm'
import { ModeToggleItem } from './profileContext/ModeToggleItem'
import SignOut from '../../forms/auth/SignOut'
import { DialogResponsive } from '@/components/global/DialogResponsive/DialogResponsive'

export function ProfileSettingsPopover({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="z-10 w-56 rounded-lg border bg-primary-foreground p-1 shadow-lg">
        <div className="flex flex-col space-y-1">
          <DialogResponsive
            form={<ProfileEditorForm />}
            title="Modifier mon profil"
            buttonProps={{
              variant: 'ghost',
              className: 'justify-start text-sm font-normal py-2',
            }}
          >
            Modifier mon profil
          </DialogResponsive>

          {/* <Button
            variant="ghost"
            className="justify-start text-sm font-normal py-2"
          >
            Settings
          </Button> */}

          <ModeToggleItem />
          <hr />
          <SignOut
            variant="ghost"
            className="w-full py-2 text-center text-sm font-normal text-red-500 hover:bg-red-50 hover:text-red-600"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
