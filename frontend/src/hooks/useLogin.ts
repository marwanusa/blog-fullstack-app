import { handelLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: handelLogin,
    onSuccess: (data) => {
      login(data);
      navigate("/");
    },
    onError: (error: any) => {
      console.error(" Login failed:", error.response?.data || error.message);
    },
  });
};

export default useLogin;
