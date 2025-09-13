import { apiRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const getUserProfile = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error("Enter A Valid userId");
  }
  const res = await apiRequest.get(`/users/profile/${userId}`);
  return res.data;
};

export function useUserProfile(userId?: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });
}
