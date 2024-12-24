import { z } from "zod";


export const loginSchema = () => {

    return z.object({
        email: z
            .string()
            .nonempty("Email is required")
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"),


        password: z
            .string()
            .nonempty("Password is required")
            .min(8, "Password must be at least 6 characters long"),
    });
};
