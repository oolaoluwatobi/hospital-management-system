import clsx from "clsx";
import Image from "next/image";
import React from "react";

// import cancelled from "@/public/assets/images/cancelled-bg.png";
// import pending from "@/public/assets/images/pending-bg.png";
// import appointments from "@/public/assets/images/appointments-bg.png";

interface StatCardProps {
  count: number;
  type: "appointments" | "pending" | "cancelled";
  icon: string;
  label: string;
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt="icon"
          height={32}
          width={32}
          className="size-8  w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
