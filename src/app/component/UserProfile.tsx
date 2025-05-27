"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Skull } from "lucide-react";
import { AnimatePresence, motion as m } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  fetchUserAvatar,
  fetchUserAvatarFrame,
  fetchUserData,
} from "../action";
import { QUERY_KEYS_MAP } from "../lib/constant";
import { parseUnixTimestampToUTC } from "../lib/dateFormatter";
import ChangeUserModal from "./ChangeUserModal";

const UserProfile = () => {
  const [completeAnimation, setCompleteAnimation] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS_MAP.USER_INFO],
    queryFn: fetchUserData,
    retry: 1,
  });
  const { data: avatarData, refetch: refetchAvatar } = useQuery({
    queryKey: [QUERY_KEYS_MAP.AVATAR],
    queryFn: fetchUserAvatar,
    retry: 1,
  });

  const { data: avatarFrame, refetch: refetchAvatarFrame } = useQuery({
    queryKey: [QUERY_KEYS_MAP.AVATAR_FRAME],
    queryFn: fetchUserAvatarFrame,
    retry: 1,
  });

  const handleRefetchAll = async () => {
    await refetch();
    await refetchAvatar();
    await refetchAvatarFrame();
  };

  if (isLoading) {
    return (
      <Skeleton className="w-48 h-48 rounded-full border-4 border-gray-700 p-2" />
    );
  }

  if (isError) {
    return (
      <div className="w-64 h-auto p-6 rounded-xl border border-red-600 bg-red-900 bg-opacity-30 text-red-300 flex flex-col items-center justify-center text-center shadow-lg">
        <Skull size={48} className="text-red-400 mb-3" />
        <p className="text-lg font-semibold">Error Loading Profile</p>
        <p className="text-sm mt-1">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <m.div className="flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {data && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => setCompleteAnimation(true)}
            className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-700 shadow-xl flex items-center justify-center"
          >

            {avatarData?.image_small && (
              <Image
                alt="Steam Avatar"
                src={`http://media.steampowered.com/steamcommunity/public/images/${avatarData.image_small}`}
                width={200}
                height={200}
                priority
                className="absolute inset-0 rounded-full z-0"
              />
            )}

            {avatarFrame?.image_small && (
              <Image
                alt="Avatar User"
                src={`http://media.steampowered.com/steamcommunity/public/images/${avatarFrame.image_small}`}
                width={200}
                height={200}
                priority
                className="absolute inset-0 rounded-full z-10"
              />
            )}
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {completeAnimation && data && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center items-center mt-6 text-white"
          >
            <h1
              className="
  text-2xl md:text-xl lg:text-2xl
  font-black
  text-gray-200
  drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]
  uppercase
  tracking-wide
"
            >
              {data.personaname}
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Last seen:{" "}
              <span className="font-medium">
                {parseUnixTimestampToUTC(data.lastlogoff)}
              </span>
            </p>

            <Button onClick={() => setOpen(true)} className="mt-4">
              Change User
            </Button>
          </m.div>
        )}
      </AnimatePresence>
      <ChangeUserModal
        open={open}
        setOpen={setOpen}
        refetch={handleRefetchAll}
      />
    </m.div>
  );
};

export default UserProfile;
