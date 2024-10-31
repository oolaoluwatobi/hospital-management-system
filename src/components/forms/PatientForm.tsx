"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import CustomFormField from "./CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import CustomFormField from "../CustomFormField";
// import { Input } from "@/components/ui/input";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// const UserFormValidation = z.object({
//   name: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   phone: z.string().min(9, {
//     message: "Phone must be at least 2 characters.",
//   }),
//   email: z.string().min(2, {
//     message: "Email must be at least 2 characters.",
//   }),
// });

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    phone,
    email,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        name,
        phone,
        email,
      };

      console.log(userData);
      const user = await createUser(userData);
      console.log(user, user.id, user.$id, "new user created");

      if (user) {
        router.push(`/patients/${user.$id}/register`);
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
          <h1 className="header">Hi there 👋🏾</h1>
          <p className=" text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconAlt="user"
          iconSrc={userIcon}
          // description="This is your public display name."
        />

        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@mail.com"
          iconAlt="email"
          iconSrc={emailIcon}
          // description="This is your public display name."
        />

        <CustomFormField
          fieldType={FormFieldTypes.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(234) 810-123-4567"
          // iconAlt="email"
          // iconSrc={emailIcon}
          // description="This is your public display name."
        />

        <SubmitButton>{isLoading ? "Loading..." : "Get started"}</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
