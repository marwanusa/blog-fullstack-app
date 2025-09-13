import { apiRequest } from "@/api/api.ts";
import type { handelLoginProps, handelRegisterProps } from "@/types/FormType";


export const handelRegister = async (data: handelRegisterProps) => {
  const res = await apiRequest.post("/auth/register", data);
  return res.data;
};

export const handelLogin = async (data: handelLoginProps) => {
  const res = await apiRequest.post("/auth/login", data);
  return res.data;
};

