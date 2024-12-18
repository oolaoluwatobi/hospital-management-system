"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    console.log(appointment, "create appointment action");
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    console.log(newAppointment, "new user");
    return parseStringify(newAppointment); //check this compare to getUser
  } catch (error) {
    console.log(error, "error create appointment action");
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );

    const initialCounts = {
      scheduledCounts: 0,
      pendingCounts: 0,
      cancelledCounts: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCounts += 1;
        }
        if (appointment.status === "pending") {
          acc.pendingCounts += 1;
        }
        if (appointment.status === "cancelled") {
          acc.cancelledCounts += 1;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    console.log(appointments.documents, data, "appointments.documents, data");

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};
