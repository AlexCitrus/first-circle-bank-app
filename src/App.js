import React from "react";
import { CustomProvider, Container } from "rsuite";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import SignOut from "./pages/auth/SignOut";
import Dashboard from "./pages/dashboard/Dashboard"; // Import the actual Dashboard component
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import { BankAccountProvider } from "./context/BankAccountContext";
import Deposit from "./pages/bankActions/deposit/Deposit";
import Withdraw from "./pages/bankActions/withdraw/Withdraw";
import Transfer from "./pages/bankActions/transfer/Transfer";
const App = () => {
  return (
    <AuthProvider>
      <BankAccountProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signout" element={<SignOut />} />
            <Route
              path="/deposit"
              element={<ProtectedRoute element={<Deposit />} />}
            />
            <Route
              path="/withdraw"
              element={<ProtectedRoute element={<Withdraw />} />}
            />
            <Route
              path="/transfer"
              element={<ProtectedRoute element={<Transfer />} />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
          </Routes>
        </Router>
      </BankAccountProvider>
    </AuthProvider>
  );
};

export default App;
