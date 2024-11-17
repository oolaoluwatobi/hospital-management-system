"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";
// import { FormFieldTypes } from "./PatientForm";
import Image from "next/image";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormFieldTypes } from "./forms/RegisterForm";

import calender from "@/public/assets/icons/calendar.svg";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

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
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
    // label,
    // description,
    // children,
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
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={calender}
            alt="calendar"
            width={24}
            height={24}
            className="ml-2 "
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              // className="shad-input border-0  "
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldTypes.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            disabled={props.disabled}
            className="shad-textArea  "
          />
        </FormControl>
      );
    case FormFieldTypes.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
              // className="shad-checkbox"
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
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
    // placeholder,
    // description,
    // iconSrc,
    // iconAlt,
    // disabled,
    // dateFormat,
    // showTimeSelect,
    // children,
    // renderSkeleton,
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
          {fieldType !== FormFieldTypes?.CHECKBOX && label && (
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
