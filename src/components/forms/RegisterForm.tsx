"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
// import CustomFormField from "./CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import SubmitButton from "../SubmitButton";
import { PatientFormValidation } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createUser } from "@/lib/actions/patient.action";
import CustomFormField from "../CustomFormField";
import { RadioGroup } from "@radix-ui/react-radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { registerPatient } from "@/lib/actions/patient.action";
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

// const PatientFormValidation = z.object({
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

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // console.log(user, "user register form");

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      phone: "",
      email: "",
    },
  });

  console.log(isLoading, "loading state");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    console.log(values, "values register form");

    let formData: FormData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFIle", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
      // formData.append("identificationDocument", blobFile);

      // formData = new FormData();
      // values.identificationDocument.forEach((file) => {
      //   formData.append("identificationDocument", file);
      // });
    }

    console.log(values.email, "values passed formData ");
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        //@ts-expect-error // #check_this
        identificationDocument: formData,
      };

      console.log(patientData);
      //@ts-expect-error // #check_this
      const patient = await registerPatient(patientData);
      console.log(patient);

      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }

      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1 "
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋🏾</h1>
          <p className=" text-dark-700">Let us know more about you.</p>
        </section>

        {/* personal info */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="ex: John Doe"
          iconAlt="user"
          iconSrc={userIcon}
          // description="This is your public display name."
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="ex: johndoe@mail.com"
            iconAlt="email"
            iconSrc={emailIcon}
            // description="This is your public display name."
          />

          <CustomFormField
            fieldType={FormFieldTypes.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="ex: (234) 810-123-4567"
            // iconAlt="email"
            // iconSrc={emailIcon}
            // description="This is your public display name."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            // placeholder="johndoe@mail.com"
            // iconAlt="email"
            // iconSrc={emailIcon}
            // description="This is your public display name."
          />

          <CustomFormField
            fieldType={FormFieldTypes.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}{" "}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="ex: 1234, Old Bodija, Ibadan, Nigeria"
            iconAlt="address"
            iconSrc={emailIcon}
            // description="This is your public display name."
          />

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="ex: Software Engineer"
            iconSrc={userIcon}
            iconAlt="user"
            // iconSrc={emailIcon}
            // description="This is your public display name."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="emergencyContact"
            label="Emergency Contact name"
            placeholder="Emergency Contact name"
            iconAlt="address"
            iconSrc={userIcon}
            // description="This is your public display name."
          />

          <CustomFormField
            fieldType={FormFieldTypes.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact phone number"
            // placeholder="2348101234567"
            // iconAlt="email"
            // iconSrc={emailIcon}
            // description="This is your public display name."
          />
        </div>

        {/* medical info */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Physician"
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="ex: NHIS"
          />

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ex: ABC123456"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies"
            placeholder="ex: Peanuts, Chloroquin, etc."
          />

          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current medication (if any)"
            placeholder="ex: Ibuprofen, Paracetamol, etc."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical history (If relevant)"
            placeholder="ex: Parent had diabetes"
          />

          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="ex: Asthma diagnosis in childhood"
          />
        </div>

        {/* identification and verification info */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="ex: ABC123456"
        />

        <CustomFormField
          fieldType={FormFieldTypes.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of Identification document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        {/* Consent and Privacy */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomFormField
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of my medical information"
        />
        <CustomFormField
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <SubmitButton>{isLoading ? "Loading..." : "Get started"}</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
