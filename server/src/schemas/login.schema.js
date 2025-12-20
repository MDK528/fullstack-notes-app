import {z} from "zod";

export const loginSchema = z.object({
        userName: z
                .string()
                .nonempty("Username is required")
                .min(3, "Username must be at least 3 characters")
                .max(8, "Username must be less than 8 characters")
                // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d-_]{3,8}$/, "Username must contain at least 1 Alphabet, 1 Number or 1 character ")
                ,
        password: z
                .string()
                .nonempty("Paaword is required")
                .min(6, "Password must be contain at least 6 characters")
})