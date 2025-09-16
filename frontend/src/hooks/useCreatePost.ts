import { handelCreatePost } from "@/api/posts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreatePost = () => {
  return useMutation({
    mutationFn: handelCreatePost,
    onSuccess: (data) => {
      toast.success("Post created successfully!");
      console.log("Created post:", data);
    },
    onError: (error: any) => {
      console.error("Failed to create post:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create post");
    },
  });
};

export default useCreatePost;
