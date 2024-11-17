import Link from "next/link";
import React from "react";
import logo from "@/public/assets/icons/logo-full.svg";
import Image from "next/image";

const SuccessPage = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            height={1000}
            width={1000}
            className="h-10 w-fit"
          />
        </Link>

        <section className="fex flex-col items"></section>

        <h2 className="header mb-6 max-w-[600px] text-center ">
          Your <span className="text-green-500 ">appointment request</span> has
          been successfully submitted.
        </h2>
      </div>
    </div>
  );
};

export default SuccessPage;
