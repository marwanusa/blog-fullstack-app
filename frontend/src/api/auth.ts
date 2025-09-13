import { apiRequest } from "@/api/api.ts";

type handelRegisterProps = {
  username: string;
  email: string;
  password: string;
};

type handelLoginProps = {
  email: string;
  password: string;
};
export const handelRegister = async (data: handelRegisterProps) => {
  const res = await apiRequest.post("/auth/register", data);
  return res.data;
};

export const handelLogin = async (data: handelLoginProps) => {
  const res = await apiRequest.post("/auth/login", data);
  return res.data;
};

