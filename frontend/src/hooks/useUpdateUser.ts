import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { handelUserUpdate } from "@/api/user";
import { toast } from "sonner";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handelUserUpdate,
    onSuccess: (data) => {
      toast.success(data.message || "User Updated successfully!", {
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error: any) => {
      console.error(" Update failed:", error.response?.data || error.message);
    },
  });
};

export default useUpdateUser;
