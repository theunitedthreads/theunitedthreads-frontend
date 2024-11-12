"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function ContinueToLoginModal({ open, setOpen, text }) {
  return (
    <AlertDialog open={open} setOpen={setOpen}>
      <AlertDialogContent className="space-y-5">
        <div className="flex items-start gap-x-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-600 text-yellow-400">
            <TriangleAlert size={20} strokeWidth={2.6} />
          </div>

          <div className="space-y-2">
            <h5 className="text-xl font-semibold">Authentication Required</h5>
            <p>
              Please{" "}
              <Link href="/login" className="underline">
                login
              </Link>{" "}
              or{" "}
              <Link href="/sign-up" className="underline">
                create account
              </Link>{" "}
              to {text || "continue"}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Link href="/login">
            <AlertDialogAction className="bg-primary-black">
              Continue to login
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
