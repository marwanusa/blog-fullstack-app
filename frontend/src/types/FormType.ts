export type handelRegisterProps = {
  username: string;
  email: string;
  password: string;
};

export type handelLoginProps = {
  email: string;
  password: string;
};

export type handelCreatePostProps = {
  title: string;
  description: string;
  category:string;
  image:File;
};