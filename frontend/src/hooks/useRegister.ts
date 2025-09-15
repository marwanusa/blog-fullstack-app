import { handelRegister } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; 

export function useRegister() {
  return useMutation({
    mutationFn: handelRegister,
    onSuccess: (data) => {
      toast.success(data.message || "Registered successfully!", {
        duration: 1000,
      });
    },
    onError: (error: any) => {
      console.error("Register failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message, {
        duration: 1000,
        dismissible: false,
      });
    },
  });
}
