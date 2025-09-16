import { apiRequest } from "./api";
import type { handelCreatePostProps } from "@/types/FormType";

export const handelCreatePost = async (data: handelCreatePostProps) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("image", data.image); 

  const res = await apiRequest.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
