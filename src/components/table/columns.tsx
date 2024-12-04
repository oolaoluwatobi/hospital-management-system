"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
  id: string;
  patientName: string;
  date: Date;
  status: "pending" | "scheduled" | "cancelled";
  primaryPhysician: string;
  email: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return <div className="text-14-medium">{row.original.patientName}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px] ">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image}
            alt={doctor?.name}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap text-14-mediu">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
