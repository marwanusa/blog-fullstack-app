import { z } from "zod";

const PostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(200, { message: "Title must be less than 200 characters." }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().trim(),

  image: z
    .instanceof(File, { message: "Image is required." }) 
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "Image size must be less than 1MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Only .jpg and .png formats are supported.",
    }),
});

export default PostSchema;
