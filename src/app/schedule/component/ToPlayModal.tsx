"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GameItem } from "@/types";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createToPlayGame, updateToPlayGame } from "../service/update";
import { InputDuration, InputGame } from "./Form/FormInput";
import { LoadingModal } from "./Modal/LoadingModal";
import Alert from "@/app/component/Alert";

export interface Payload {
  gameId: string;
  duration: number;
}

interface IToPLayModalProps {
  isEdit: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    gameInfo: GameItem;
    gameId: number;
    duration: number;
  } | null;
}

const ToPlayModal = ({ data, isEdit, open, setOpen }: IToPLayModalProps) => {
  const [messageError, setMessageError] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Payload>({
    defaultValues: {
      gameId: data && isEdit ? String(data.gameId) : "",
      duration: data && isEdit ? data.duration : 0,
    },
  });

  const {mutate, isPending} = useMutation({
    mutationFn: async(payload: Payload) => {
      if (isEdit) {
        return updateToPlayGame(+payload.gameId, payload.duration);
      } else {
        const result =  await createToPlayGame(+payload.gameId, payload.duration);
        console.log('result', result);
        if(!result) {
          setMessageError("Game already exist");
          setOpenAlert(true);
        }
        return result;
      }
    }
  })

  const submit: SubmitHandler<Payload> = async (dataPayload) => {
    mutate(dataPayload);
    setOpen(false);
    reset();
  };


  useEffect(() => {
    if (isEdit && data) {
      reset({
        gameId: String(data.gameId),
        duration: data.duration,
      });
    } else {
      reset({
        gameId: "",
        duration: 0,
      });
    }
  }, [data, isEdit, reset]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-800/50 backdrop-blur-lg text-gray-100 p-6 rounded-lg shadow-2xl border border-gray-700/50 w-full md:max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-6 text-center">
            <DialogTitle
              className="
            text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600
            drop-shadow-[0_0_8px_rgba(255,100,255,0.7)]
          "
            >
              {isEdit ? "Quest Log: Edit" : "New Quest: Add Game"}
            </DialogTitle>
            <DialogDescription
              className="
            text-lg text-gray-300 italic font-semibold pt-2
          "
            >
              {isEdit
                ? "Adjust your strategic game plan."
                : "Initiate a new objective for your gaming journey!"}
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-6 py-4" onSubmit={handleSubmit(submit)}>
            <InputGame
              control={control}
              errors={errors}
              data={data?.gameInfo}
              isEdit={isEdit}
            />
            <InputDuration control={control} errors={errors} />

            <div className="flex w-full gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="
                  bg-gray-700/70 text-gray-200 border-2 border-gray-500
                  hover:bg-gray-600 hover:border-gray-400
                  px-6 py-3 rounded-lg text-lg font-bold shadow-md
                  transition-all duration-200
                "
              >
                Go back
              </Button>
              <Button
                type="submit"
                className="
                  bg-gradient-to-r from-green-500 to-emerald-700 text-white border-2 border-green-400
                  hover:from-green-600 hover:to-emerald-800
                  px-8 py-3 rounded-lg text-lg font-bold shadow-lg
                  transition-all duration-200 transform hover:scale-105
                  [text-shadow:0_0_5px_rgba(255,255,255,0.7)]
                "
              >
                {isEdit ? "Update Quest" : "Accept Quest"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <LoadingModal isOpen={isPending} message="Contacting nearest HQ..." />
      <Alert isOpen={openAlert} setOpen={setOpenAlert} message={messageError} />
    </>
  );
};

export default ToPlayModal;
