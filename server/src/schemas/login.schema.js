import {z} from "zod";

export const loginSchema = z.object({
        userName: z
                .string()
                .min(3, "Username must be 3 characters")
                .max(8, "Username must be less than 8")
                .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d-_]{3,8}$/, "Username must contain at least 1 Alphabet, 1 Number or 1 character ")
                ,
        password: z
                .string()
                .min(6, "Password must be contain at least 6 characters")
})