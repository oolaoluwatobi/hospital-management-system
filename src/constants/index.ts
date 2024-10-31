import drGreen from "/src/public/assets/images/dr-green.png";
import drCameron from "@/public/assets/images/dr-cameron.png";
import drLivinston from "/src/public/assets/images/dr-livingston.png";
import drPeter from "@/public/assets/images/dr-peter.png";
import drPowell from "@/public/assets/images/dr-powell.png";
import drRemirez from "@/public/assets/images/dr-remirez.png";
import drLee from "@/public/assets/images/dr-lee.png";
import drCruz from "@/public/assets/images/dr-cruz.png";
import drSharma from "@/public/assets/images/dr-sharma.png";

import scheduleIcon from "@/public/assets/icons/check.svg";
import pendingIcon from "/src/public/assets/icons/pending.svg";
import cancelledIcon from "/src/public/assets/icons/cancelled.svg";

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  // "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  // "Resident Alien Card (Green Card)",
  // "Social Security Card",
  // "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: drGreen,
    name: "John Green",
  },
  {
    image: drCameron,
    name: "Leila Cameron",
  },
  {
    image: drLivinston,
    name: "David Livingston",
  },
  {
    image: drPeter,
    name: "Evan Peter",
  },
  {
    image: drPowell,
    name: "Jane Powell",
  },
  {
    image: drRemirez,
    name: "Alex Ramirez",
  },
  {
    image: drLee,
    name: "Jasmine Lee",
  },
  {
    image: drCruz,
    name: "Alyana Cruz",
  },
  {
    image: drSharma,
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: scheduleIcon,
  pending: pendingIcon,
  cancelled: cancelledIcon,
};
