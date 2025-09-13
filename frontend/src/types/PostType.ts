import type { IUser } from "./UserType";

export interface IPost {
  _id: string;
  user: IUser;
  title: string;
  description: string;
  category: string;
  image: {
    url: string;
    publicId: string;
  };
  likes: [string];
  createdAt: string;
  updatedAt: string;
  id: string;
}
