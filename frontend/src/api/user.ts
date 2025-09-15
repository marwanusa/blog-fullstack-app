import { apiRequest } from "./api";

export const handelUserUpdate = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await apiRequest.put(`/users/profile/${id}`, data);
  return res.data;
};

export const handelUserAvatarUpdate = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await apiRequest.post(
    `/users/profile/profile-photo-upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
