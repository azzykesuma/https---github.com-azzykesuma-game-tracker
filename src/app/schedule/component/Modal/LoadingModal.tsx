import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const LoadingModal = ({
  isOpen = false,
  message = "Loading... Please wait.",
}) => {
  return (
    <Dialog open={isOpen}>
      {/* onOpenChange is omitted here to make the modal non-dismissible by clicking outside */}
      <DialogContent className="
        border-4 border-blue-500 bg-gradient-to-br from-gray-900 to-black
        text-white font-mono shadow-2xl rounded-xl
        p-8 max-w-xs sm:max-w-sm
        flex flex-col items-center justify-center text-center
        animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95
      ">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-300 uppercase tracking-wider drop-shadow-[0_0_5px_rgba(0,191,255,0.7)]">Loading</DialogTitle>
            <DialogDescription className="text-sm font-bold text-gray-300 mt-2 leading-relaxed">Please wait...</DialogDescription>
        </DialogHeader>
        <p className="
          text-xl font-bold text-blue-300 uppercase tracking-wider
          drop-shadow-[0_0_5px_rgba(0,191,255,0.7)]
        ">
          {message}
        </p>
      </DialogContent>
    </Dialog>
  );
};