import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (user) => {
    setUserData(user);
 
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
