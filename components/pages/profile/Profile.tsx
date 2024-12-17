import { getSession } from '@/lib/auth/getsession'
import React from 'react'
import { ProfileSettingsPopover } from './ProfileSettingsPopover'

const Profile = async () => {
  const session = await getSession()
  const name = session.user?.name
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    ?.toUpperCase()
  return (
    <ProfileSettingsPopover>
      <section className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-300 text-black">
        {initials}
      </section>
    </ProfileSettingsPopover>
  )
}

export default Profile
