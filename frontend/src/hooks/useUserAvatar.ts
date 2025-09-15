
import { handelUserAvatarUpdate } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUserAvatar = () => {

  return useMutation({
    mutationFn: handelUserAvatarUpdate,
    onSuccess: (data) => {
        toast.success("Avatart Updated")
        console.log(data)
    },
    onError: (error: any) => {
      console.error(" Avatart failed Updated", error.response?.data || error.message);
    },
  });
};

export default useUserAvatar;

