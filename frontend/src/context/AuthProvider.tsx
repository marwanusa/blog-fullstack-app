import { apiRequest } from "@/api/api";
import type { LoginResponseData } from "@/types/AuthContextType";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponseData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      apiRequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${savedToken}`;
    }
    setLoading(false);
  }, []);
  const login = (data: LoginResponseData) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setToken(data.token); 
    setUser(data);
    apiRequest.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete apiRequest.defaults.headers.common["Authorization"];
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
