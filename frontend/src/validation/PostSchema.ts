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
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required.",
    })
    .refine(
      (files) => files instanceof FileList && files[0].size <= 1 * 1024 * 1024,
      { message: "Image size must be less than 1MB" }
    )
    .refine(
      (files) =>
        files instanceof FileList &&
        ["image/jpeg", "image/png"].includes(files[0].type),
      { message: "Only .jpg and .png formats are supported." }
    ),
});

export default PostSchema;
