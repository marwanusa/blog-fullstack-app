import { z } from "zod";

const RegisterFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(100, { message: "Username must be less than 100 characters." }),
  email: z
    .string()
    .trim()
    .min(5, { message: "Email must be at least 5 characters." })
    .max(100, { message: "Email must be less than 100 characters." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
    .regex(/[a-z]/, {
      message: "Password must contain at least 1 lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least 1 uppercase letter.",
    }),
});

export default RegisterFormSchema;
