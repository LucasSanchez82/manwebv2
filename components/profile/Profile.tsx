import { getSession } from "@/lib/auth/getsession";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { ProfileSettingsPopover } from "./ProfileSettingsPopover";

const Profile = async () => {
  const session = await getSession();
  const image = session.user?.image;
  const name = session.user?.name;
  const avatarFallack = name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <ProfileSettingsPopover>
      <section className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full overflow-hidden absolute top-2 right-5 cursor-pointer text-black">
        <Avatar>
          <AvatarImage src={"image!"} alt={name || "nom utilisateur"} />
          <AvatarFallback>{avatarFallack || "null"}</AvatarFallback>
        </Avatar>
      </section>
    </ProfileSettingsPopover>
  );
};

export default Profile;
