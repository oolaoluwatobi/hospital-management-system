"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import CustomFormField from "./CustomFormField";
// import userIcon from "@/public/assets/icons/user.svg";
// import emailIcon from "@/public/assets/icons/email.svg";
import SubmitButton from "../SubmitButton";
import { getAppointmentSchema } from "@/lib/validation";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { FormFieldTypes } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";
import { createAppointment } from "@/lib/actions/appointment.actions";

export const AppointmentForm = ({
  userId,
  patientId,
  patient,
  type = "create",
}: // appointment,
// setOpen,
{
  userId: string;
  patientId: string;
  patient: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    console.log("submitting");
    console.log(values, type, patientId, "values, type, patientId ");

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        console.log("submitting 2");
        const appointmentData = {
          userId,
          patient: patient,
          patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note!,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 "
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className=" text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldTypes.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a Doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className=" rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment Date"
              showTimeSelect
              dateFormat="MM/dd/yy - h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton>{isLoading ? "Loading..." : "Get started"}</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
