'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Skull } from "lucide-react";
import { AnimatePresence, motion as m } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { fetchUserData } from "../action";
import { QUERY_KEYS_MAP } from "../lib/constant";
import { parseUnixTimestampToUTC } from "../lib/dateFormatter";
import { Button } from "@/components/ui/button";
import ChangeUserModal from "./ChangeUserModal";

const UserProfile = () => {
  const [completeAnimation, setCompleteAnimation] = useState(false);
  const [open,setOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS_MAP.USER_INFO],
    queryFn: fetchUserData,
    retry: 1,
  });

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
    <>
      <m.div className="flex flex-col items-center justify-center p-4">
        <AnimatePresence>
          {data && (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => setCompleteAnimation(true)}
              className="relative w-48 h-48 rounded-full border-4 border-blue-500 shadow-xl overflow-hidden bg-gray-700 flex items-center justify-center"
            >
              <Image
                alt="avatar"
                src={data.avatarfull}
                layout="fill"
                priority
                className="rounded-full"
              />
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
              <h1 className="text-3xl font-extrabold text-blue-300 drop-shadow-lg">
                {data.personaname}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Last seen: <span className="font-medium">{parseUnixTimestampToUTC(data.lastlogoff)}</span>
              </p>
              <Button onClick={() => setOpen(true)} className="mt-4">Change User</Button>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
      <ChangeUserModal open={open} setOpen={setOpen} refetch={refetch} />
    </>
  );
};

export default UserProfile;
