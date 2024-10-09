import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const BankAccountContext = createContext();

export const BankAccountProvider = ({ children }) => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const { isAuthenticated, users, currentEmail, setUsers } = useAuth();

  // Effect hook to update user information when authentication state changes
  useEffect(() => {
    const currentUser = users.find((user) => user.email === currentEmail);

    if (currentUser) {
      setAccountBalance(Number(currentUser.accountBalance));
      setEmail(currentUser.email);
      setUsername(
        currentUser.email.split("@")[0].charAt(0).toUpperCase() +
          currentUser.email.split("@")[0].slice(1)
      );
    }
  }, [isAuthenticated, users, currentEmail]);

  // Helper function to update user data in local storage and state
  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Method to handle depositing money into the account
  const deposit = (amount) => {
    const newBalance = accountBalance + Number(amount);
    setAccountBalance(newBalance);
    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, accountBalance: newBalance.toString() }
        : user
    );
    updateLocalStorage(updatedUsers);
  };

  // Method to handle withdrawing money from the account
  const withdraw = (amount) => {
    if (Number(amount) > accountBalance) {
      throw new Error("Insufficient funds");
    }
    const newBalance = accountBalance - Number(amount);
    setAccountBalance(newBalance);
    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, accountBalance: newBalance.toString() }
        : user
    );
    updateLocalStorage(updatedUsers);
  };

  // Method to handle transferring money to another user
  const transfer = (recipientEmail, amount) => {
    if (Number(amount) > accountBalance) {
      throw new Error("Insufficient funds");
    }
    const recipientIndex = users.findIndex(
      (user) => user.email === recipientEmail
    );
    if (recipientIndex === -1) {
      throw new Error("Recipient not found");
    }

    // Update sender's and recipient's balances
    const newSenderBalance = accountBalance - Number(amount);
    setAccountBalance(newSenderBalance);

    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        return { ...user, accountBalance: newSenderBalance.toString() };
      } else if (user.email === recipientEmail) {
        return {
          ...user,
          accountBalance: (
            Number(user.accountBalance) + Number(amount)
          ).toString()
        };
      }
      return user;
    });

    // Update local storage and context
    updateLocalStorage(updatedUsers);
  };

  // Method to get the current account balance
  const getAccountBalance = () => accountBalance;

  return (
    <BankAccountContext.Provider
      value={{
        accountBalance,
        deposit,
        withdraw,
        transfer,
        getAccountBalance,
        username
      }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};

// Custom hook to use the BankAccount context
export const useBankAccount = () => {
  return useContext(BankAccountContext);
};
