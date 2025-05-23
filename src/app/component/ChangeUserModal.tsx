"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion as m } from "motion/react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { encrypt, setCookie } from "../action";
import { STEAM_ID_COOKIE } from "../lib/constant";

interface IChangeUserProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => Promise<void>
}

const ChangeUserModal = ({ open, setOpen, refetch }: IChangeUserProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset, // Added reset to clear form on close
  } = useForm({
    defaultValues: {
      steamId: "",
    },
  });

  const submit: SubmitHandler<{ steamId: string }> = async (data) => {
    const { steamId } = data;
    try {
      const encryptedSteamId = await encrypt({ steamId });
      setCookie(STEAM_ID_COOKIE, encryptedSteamId);
      await refetch();
      setOpen(false);
    } catch (error) {
      console.error("Error updating Steam ID:", error);
    }
  };
  // Function to handle modal close and reset form
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800/50 backdrop-blur-lg text-gray-100 p-6 rounded-lg shadow-2xl border border-gray-700/50 w-full md:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-bold text-white mb-2">Change Steam User</DialogTitle>
          <DialogDescription className="sr-only">
            Enter your Steam ID to change the user profile.
          </DialogDescription>
        </DialogHeader>
        <div className="text-gray-300 text-base leading-relaxed mb-4"> {/* Added mb-4 for spacing */}
          To update your profile, please enter your Steam ID.
          <br className="my-2"/>
          <span className="font-semibold text-blue-300">How to find your Steam ID:</span>
          <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-gray-400">
            <li>Go to your Steam Profile in a web browser.</li>
            <li>Right-click anywhere on the page and select &quot;Copy Page URL&quot; or &quot;Copy Link Address&quot;.</li>
            <li>Your Steam ID is the long number in the URL that starts with `765`, for example: <code className="bg-gray-700 text-blue-200 px-1 py-0.5 rounded text-xs break-all">https://steamcommunity.com/profiles/<span className="font-bold">76561198000000000</span>/</code></li>
            <li>Paste this `765...` number into the field below.</li>
            <li>To be able to see the whole playtime summary, a steam public account is required.</li>
          </ol>
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <Label htmlFor="steamId" className="text-lg font-semibold text-white mb-2 block">Steam ID</Label>
            <Controller
              control={control}
              name="steamId"
              rules={{
                required: "Steam ID is required.",
                pattern: {
                  value: /^7656119\d{10}$/,
                  message: "Please enter a valid Steam ID (starts with 765 and is 17 digits long)."
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="steamId"
                  placeholder="e.g., 76561198000000000"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            />
            <AnimatePresence>
              {errors.steamId && (
                <m.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {errors.steamId.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>
          <div className="w-full flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="px-6 py-2 rounded-md font-semibold text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-colors duration-200"
            >
              Change User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserModal;
