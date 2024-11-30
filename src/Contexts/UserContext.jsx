import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default  function UserProvider  ({ children }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '', 
    token: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    setUser({ name: '', email: '', image: '', token: '' }); 
  };

  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
};


