"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValue, FieldValues } from "react-hook-form";
// import { FormFieldTypes } from "./PatientForm";
import Image from "next/image";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormFieldTypes } from "./forms/RegisterForm";

import calender from "@/public/assets/icons/calendar.svg";

interface CustomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, FieldValues>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderInputField = ({
  field,
  props,
}: {
  field: any;
  props: CustomProps;
}) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    description,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2 "
            />
          )}
          <FormControl>
            <Input
              {...field}
              control={control}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              className="shad-input border-0  "
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            // onChange={(value) => field.onChange(value)}
            className="input-phone "
          />
        </FormControl>
      );
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="">
          <Image
            src={calender}
            alt="calendar"
            width={24}
            height={24}
            className="ml-2 "
          />
          <FormControl></FormControl>
        </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    description,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      // label={label}
      // placeholder={placeholder}
      // description={description}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderInputField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
