import { z } from "zod";

export const signupSchema = () => {
  return z
    .object({
      name: z
        .string()
        .nonempty("Username is required")
        .min(3, "Username must be at least 3 characters long")
        .regex(/^[a-zA-Z]+$/, "Username is invalid"),

      email: z
        .string()
        .nonempty("Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"),

      phone: z
        .string()
        .nonempty("Phone is required")
        .regex(/^(011|010|012|015)\d{8}$/, "Phone is invalid"),

      countryCode: z
        .string()
        .nonempty("Country code is required")
        .regex(/^(\+?\d{1,3}|\d{1,4})$/gm, "Country code is invalid"),

      password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long"),

      confirmPassword: z
        .string()
        .nonempty("Confirm password is required")
        .min(8, "Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
};
