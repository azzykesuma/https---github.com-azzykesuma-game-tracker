import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface IAlertProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  setOpen: (isOpen: boolean) => void;
}

const Alert = ({
  isOpen = false,
  title = "Alert",
  message = "This is an alert message.",
  setOpen,
}: IAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent
        className="
        border-4 border-purple-500 bg-gradient-to-br from-gray-600 to-black
        text-white font-mono shadow-2xl rounded-xl
        p-8 max-w-sm sm:max-w-md
        flex flex-col items-center justify-center text-center
        animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95
      "
      >
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle
            className="
            text-3xl font-bold text-purple-300 uppercase tracking-wider
            drop-shadow-[0_0_5px_rgba(128,0,128,0.7)]
          "
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className="
            text-lg text-gray-300 mt-2
            leading-relaxed
          "
          >
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center mt-6">
          <Button
            className="
            bg-gradient-to-r from-green-500 to-emerald-700 text-white border-2 border-green-400
            hover:from-green-600 hover:to-emerald-800
            px-8 py-3 rounded-lg text-lg font-bold shadow-lg
            transition-all duration-200 transform hover:scale-105
            [text-shadow:0_0_5px_rgba(255,255,255,0.7)]
          "
            onClick={() => setOpen(false)}
          >
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
