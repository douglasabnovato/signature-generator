import { SignatureData } from "../types/signature";

export const calculateProgress = (state: SignatureData): number => {
  let progress = 100;
  const fieldsToCheck = state.withPhoto
    ? ["fullName", "phone", "position", "site", "photo"]
    : ["fullName", "phone", "position", "site"];

  const deduction = 100 / fieldsToCheck.length;

  fieldsToCheck.forEach((field) => {
    const value = state[field as keyof SignatureData];
    if (typeof value === "string" && value.length === 0) {
      progress -= deduction;
    }
  });

  return Math.max(0, Math.round(progress));
};