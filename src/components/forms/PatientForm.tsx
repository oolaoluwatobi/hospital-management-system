"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
