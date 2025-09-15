import type { IPost } from "./PostType";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  profilePhoto: {
    url: string;
    publicId: string;
  };
  isAdmin: boolean;
  isAccountVerified: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  bio?:string;
  posts?:IPost

}
