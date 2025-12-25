import { z } from "zod";

export const registerSchema = z.object({
        fullName: z
                .string()
                .trim()
                .min(1, "Fullname is required")
                .max(50, "Fullname is too long")
                .regex(/^[A-Za-z]+(?:[ '][A-Za-z]+)*$/, "Only letters, single spaces, and hyphens/apostrophes allowed"),
        emailId: z
                .email("Invalid email address")
                .min(8, "EmailId must be 8 characters"),

        userName: z
                .string()
                .min(3, "Username must be 3 characters")
                .max(8, "Username must be less than 8")
                .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d-_]{3,8}$/, "Username must contain at least 1 Alphabet, 1 Number or 1 character "),
        password: z
                .string()
                .min(6, "Password must be contain at least 6 characters")
})