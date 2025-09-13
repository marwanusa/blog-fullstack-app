export interface LoginResponseData {
  _id: string;
  isAdmin: boolean;
  profilePhoto: {
    url: string;
    publicId: string;
  };
  token: string;
}

export type AuthContextType = {
  user: {
    isAdmin: boolean;
    token: string;
    _id: string;
    profilePhoto: {
      url: string;
      publicId: string;
    };
  } | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginResponseData) => void;
  logout: () => void;
};
