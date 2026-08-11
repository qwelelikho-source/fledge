import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  
  idNumber: z
    .string()
    .min(1, "ID number is required")
    .min(8, "ID number must be at least 8 characters")
    .max(20, "ID number must be less than 20 characters")
    .regex(/^[a-zA-Z0-9-]+$/, "ID number can only contain letters, numbers, and hyphens"),
  
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Invalid date format")
    .refine((date) => {
      const parsedDate = new Date(date);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120); // Not older than 120 years
      return parsedDate >= minDate;
    }, "Date of birth cannot be more than 120 years ago")
    .refine((date) => {
      const parsedDate = new Date(date);
      const maxDate = new Date();
      return parsedDate <= maxDate;
    }, "Date of birth cannot be in the future"),
  
  plan: z
    .enum(["starter", "pro", "studio"], {
      message: "Plan must be starter, pro, or studio",
    })
    .transform((val) => val.toLowerCase()),
  
  guardianName: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return val.length >= 2 && val.length <= 100;
    }, "Guardian name must be between 2 and 100 characters")
    .refine((val) => {
      if (!val) return true;
      return /^[a-zA-Z\s'-]+$/.test(val);
    }, "Guardian name can only contain letters, spaces, hyphens, and apostrophes"),
  
  guardianEmail: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }, "Invalid guardian email address")
    .transform((val) => val?.toLowerCase()),
});

export type SignupInput = z.infer<typeof signupSchema>;

export function validateSignupInput(data: unknown): { success: true; data: SignupInput } | { success: false; errors: Record<string, string> } {
  const result = signupSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  result.error.issues.forEach((error) => {
    const path = error.path.join('.');
    errors[path] = error.message;
  });
  
  return { success: false, errors };
}