"use client";

import {
  AlertDialog,
  AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  // InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import close from "@/public/assets/icons/close.svg";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";
// import { useRouter } from "next/router";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    router.push("/");
  };

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accesskey")
      : null;

  useEffect(() => {
    const accesskey = encryptedKey && decryptKey(encryptedKey);

    if (path) {
      if (accesskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        // const encryptedKey = encryptKey(passkey);
        setIsOpen(false);
        router.push("/admin");
      } else {
        setIsOpen(true);
      }
    }
  }, [encryptedKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accesskey", encryptedKey);
      setIsOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
              Admin Acess Verification
              <Image
                src={close}
                alt="close"
                width={24}
                height={24}
                onClick={() => closeModal()}
                className="cursor-pointer"
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin page, please enter the passkey.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div>
            <InputOTP
              maxLength={6}
              value={passkey}
              onChange={(value) => setPasskey(value)}
            >
              <InputOTPGroup className="shad-otp [&>*]:shad-otp-slot ">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className="shad-error text-14-regular mt-4 justify-center text-center">
                {error}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={(e) => validatePasskey(e)}
              className="shad-primary-btn w-full"
            >
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PasskeyModal;
