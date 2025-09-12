import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, { message: "Email must be at least 5 characters." })
    .max(100, { message: "Email must be less than 100 characters." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default FormSchema;
