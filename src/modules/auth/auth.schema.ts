import * as z from "zod";
import { Role } from "../../generated/prisma/enums.js";

export const RegisterSchema = z.object({
    name: z.string("Name is required").min(1, "Name is required").max(100, "Name is too long"),
    email: z.email("Invalid email format"),
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string("Please retype the password").min(6, "Confirm password must be at least 6 characters long"),
    role: z.enum(Role).default(Role.customer),
}).refine((data) => data.password == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const LoginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
