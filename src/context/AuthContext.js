import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);

  // Effect hook to initialize authentication state from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    const storedEmail = localStorage.getItem("currentUserEmail");
    setCurrentEmail(storedEmail);
  }, []);

  // Method to handle user login
  const login = (email) => {
    setIsAuthenticated(true);
    setCurrentEmail(email);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUserEmail", email);
  };

  // Method to handle user logout
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentEmail(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUserEmail");
  };

  // Method to handle user registration
  const register = (email, password, accountBalance) => {
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      throw new Error("User already exists!");
    } else if (parseFloat(accountBalance) < 10) {
      throw new Error("Initial deposit must be at least $10!");
    } else {
      const newUser = {
        email,
        password,
        accountBalance: parseFloat(accountBalance)
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      login(email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        users,
        currentEmail,
        setUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
