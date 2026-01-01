import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  image: string | null;
  onClose: () => void;
};

export default function FullscreenPreview({ open, image, onClose }: Props) {
  if (!open || !image) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <button
        onClick={onClose}
        aria-label="Close fullscreen"
        className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 border border-white/20 shadow-lg cursor-pointer"
        type="button"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="max-w-5xl w-full">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={image}
            alt="Full-screen Ghibli character"
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            Fullscreen view
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            className="rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
            type="button"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
