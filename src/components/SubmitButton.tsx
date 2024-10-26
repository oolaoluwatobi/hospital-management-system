import { ReactNode } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import loader from "@/public/assets/icons/loader.svg";

interface SubmitButtonProps {
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      // disabled
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full "}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src={loader}
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
