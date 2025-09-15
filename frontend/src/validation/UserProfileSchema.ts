import { z } from "zod";

export const EditProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username must be less than 30 characters." })
    .optional(),

  bio: z
    .string()
    .trim()
    .max(180, { message: "Bio must be less than 180 characters." })
    .optional(),

  password: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) =>
        !val || 
        (val.length >= 8 &&
          /[A-Z]/.test(val) &&
          /[a-z]/.test(val) &&
          /[0-9]/.test(val)),
      {
        message:
          "Password must be at least 8 chars, include upper, lower, and number",
      }
    ),
});

export type EditProfileInputs = z.infer<typeof EditProfileSchema>;
