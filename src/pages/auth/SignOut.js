import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const SignOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access logout function

  useEffect(() => {
    logout(); // Call logout from context
    // alert("You have been signed out.");
    navigate("/login");
  }, [navigate, logout]);

  return null; // This component doesn't render anything
};

export default SignOut;
