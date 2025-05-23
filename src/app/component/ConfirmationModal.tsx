import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface IConfirmationModal {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
} : IConfirmationModal) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>

      <DialogContent className="
        border-4 border-yellow-400 bg-gradient-to-br from-gray-900 to-black
        text-white font-mono shadow-2xl rounded-xl
        p-8 max-w-sm sm:max-w-md
        animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95
      ">
        <DialogHeader className="text-center">
          <DialogTitle className="
            text-3xl font-bold text-yellow-300 uppercase tracking-wider
            drop-shadow-[0_0_5px_rgba(255,255,0,0.7)]
          ">
            {title}
          </DialogTitle>
          <DialogDescription className="
            text-lg text-gray-300 mt-2
            leading-relaxed
          ">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-4 mt-6">
          <Button
            onClick={onClose}
            className="
              bg-red-700 hover:bg-red-800 text-white
              border-2 border-red-900
              shadow-lg hover:shadow-xl
              px-6 py-3 rounded-lg uppercase font-bold text-lg
              transition-all duration-200 transform hover:scale-105 active:scale-95
              mb-3 sm:mb-0
            "
            variant="destructive"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="
              bg-green-700 hover:bg-green-800 text-white
              border-2 border-green-900
              shadow-lg hover:shadow-xl
              px-6 py-3 rounded-lg uppercase font-bold text-lg
              transition-all duration-200 transform hover:scale-105 active:scale-95
            "
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};