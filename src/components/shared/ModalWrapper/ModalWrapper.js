import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export default function ModalWrapper({ children, open, setOpen }) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen} className="relative">
      <AlertDialogContent className="max-h-[75vh] max-w-full overflow-auto 2xl:max-w-[40%]">
        <AlertDialogHeader>
          <AlertDialogDescription className="text-primary-black">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute right-1 top-1 h-8 w-8 rounded-full border-none p-0">
            <X size={20} className="text-primary-black/75" />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
