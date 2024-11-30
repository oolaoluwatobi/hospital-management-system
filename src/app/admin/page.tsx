import Image from "next/image";
import Link from "next/link";
import React from "react";

import logoFull from "@/public/assets/icons/logo-full.svg";
import appointmentIcon from "@/public/assets/icons/appointments.svg";
import pending from "@/public/assets/icons/pending.svg";
import cancelled from "@/public/assets/icons/cancelled.svg";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns, Payment } from "@/components/table/columns";
import DataTableDemo from "@/components/table/DataTableDemo";
// import { columns, Payment } from "@/components/table";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  const data = await getData();

  console.log(appointments);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src={logoFull}
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semiold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋🏾</h1>
          <p className="text-dark-700">
            Srart the day with managing appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCounts}
            label="Scheduled appointments"
            icon={appointmentIcon}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCounts}
            label="Pending appointments"
            icon={pending}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCounts}
            label="Cancelled appointments"
            icon={cancelled}
          />
        </section>

        <DataTableDemo />
        <DataTable columns={columns} data={data} />
        {/* <DataTable columns={columns} data={appointments.data} /> */}
      </main>
    </div>
  );
};

export default Admin;

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}
