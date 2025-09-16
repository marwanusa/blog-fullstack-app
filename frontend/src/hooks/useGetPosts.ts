import { apiRequest } from "@/api/api";
import type { IPost } from "@/types/PostType";
import { useQuery } from "@tanstack/react-query";

const getPosts = async (
  selectedCategory: string | null,
  pageNumber: string | null
) => {
  if (selectedCategory && pageNumber) {
    const res = await apiRequest.get<IPost[]>(
      `/posts?category=${selectedCategory}&pageNumber=${pageNumber}`
    );
    return res.data;
  } else if (pageNumber) {
    const res = await apiRequest.get<IPost[]>(
      `/posts?pageNumber=${pageNumber}`
    );
    return res.data;
  } else if (selectedCategory && !pageNumber) {
    const res = await apiRequest.get<IPost[]>(
      `/posts?category=${selectedCategory}&pageNumber=1`
    );
    return res.data;
  }

  const res = await apiRequest.get<IPost[]>(`/posts`);
  return res.data;
};

export function useGetPosts(selectedCategory?: string, pageNumber?: string) {
  return useQuery({
    queryKey: ["posts", selectedCategory, pageNumber],
    queryFn: () => getPosts(selectedCategory, pageNumber),
  });
}
