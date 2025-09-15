import type { handelCreatePostProps } from "@/types/FormType";
import { apiRequest } from "./api";

export const handelCreatePost = async (data: handelCreatePostProps) => {
  const res = await apiRequest.post("/posts", data);
  return res.data;
};
