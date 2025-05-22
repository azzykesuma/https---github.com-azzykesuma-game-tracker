/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import GameCardModal from "../GameCardModal";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion as m } from "motion/react";
import { GameItem } from "@/types";
import { Payload } from "../ToPlayModal";

interface IFormInputProps {
    control : Control<Payload, any, Payload>
    errors :  FieldErrors<Payload>
}
export const InputGame = ({control, errors, data, isEdit} : IFormInputProps & {
    isEdit : boolean
    data : GameItem
}) => {

  return (
    <Controller
      control={control}
      name="gameId"
      render={({ field }) => (
        <div className="grid grid-cols-4 items-center gap-4">
          <label
            className="
                  col-span-1 text-right text-lg text-cyan-300 font-bold
                  [text-shadow:0_0_5px_rgba(0,255,255,0.5)]
                "
            htmlFor="gameId"
          >
            Game Title
          </label>
          {isEdit ? (
            <div className="col-span-3">
              {data && <GameCardModal data={data} />}
            </div>
          ) : (
            <Input
              id="gameId"
              placeholder="Enter Game ID or Search..."
              {...field}
              className="
                      col-span-3 bg-gray-700/70 border border-purple-500 text-white text-base rounded-md px-4 py-2
                      focus:ring-pink-500 focus:border-pink-500 transition-all duration-200
                      placeholder-gray-400 font-mono tracking-wide
                    "
            />
          )}
          {errors.gameId && (
            <AnimatePresence>
              <m.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm col-span-4 text-center font-semibold mt-1
                      drop-shadow-[0_0_3px_rgba(255,0,0,0.5)]"
              >
                {errors.gameId.message}
              </m.p>
            </AnimatePresence>
          )}
        </div>
      )}
    />
  );
};

export const InputDuration = ({control, errors} : IFormInputProps) => {

  return (
    <Controller
      control={control}
      name="duration"
      rules={{
        required: "Duration is required for your quest!",
        min: { value: 1, message: "Minimum quest duration is 1 month." },
        pattern: {
          value: /^\d*$/,
          message: "Duration must be a valid number of months.",
        },
      }}
      render={({ field }) => (
        <div className="grid grid-cols-4 items-center gap-4">
          <label
            className="
                  col-span-1 text-right text-lg text-cyan-300 font-bold
                  [text-shadow:0_0_5px_rgba(0,255,255,0.5)]
                "
            htmlFor="duration"
          >
            Quest Duration
          </label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g., 6 months"
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
            className="
                    col-span-3 bg-gray-700/70 border border-purple-500 text-white text-base rounded-md px-4 py-2
                    focus:ring-pink-500 focus:border-pink-500 transition-all duration-200
                    placeholder-gray-400 font-mono tracking-wide
                  "
          />
          {errors.duration && (
            <AnimatePresence>
              <m.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm col-span-4 text-center font-semibold mt-1
                      drop-shadow-[0_0_3px_rgba(255,0,0,0.5)]"
              >
                {errors.duration.message}
              </m.p>
            </AnimatePresence>
          )}
        </div>
      )}
    />
  );
};

