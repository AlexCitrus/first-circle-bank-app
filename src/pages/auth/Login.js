// src/pages/auth/Login.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, ButtonToolbar, FlexboxGrid, Form, Panel } from "rsuite";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      login(email);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <FlexboxGrid
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #2980b9, #6dd5fa)"
      }}
    >
      <Panel
        bordered
        style={{
          padding: 40,
          width: 500,
          height: "auto",
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 40,
            color: "#2c3e50",
            fontSize: "32px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "2px"
          }}
        >
          Login
        </h2>
        <Form fluid onSubmit={handleLogin}>
          <Form.Group controlId="email-1">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group controlId="password-1">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={setPassword}
              required
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group>
            <Button
              appearance="primary"
              type="submit"
              block
              size="lg"
              style={{
                marginTop: 20,
                background: "linear-gradient(to right, #3498db, #2980b9)",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "15px",
                borderRadius: "10px",
                transition: "all 0.3s ease",
                boxShadow:
                  "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)"
              }}
            >
              Login
            </Button>
          </Form.Group>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#34495e" }}>Don't have an account?</p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              appearance="ghost"
              style={{
                color: "#3498db",
                fontWeight: "bold",
                marginTop: "10px"
              }}
            >
              Register Now
            </Button>
          </Link>
        </div>
      </Panel>
    </FlexboxGrid>
  );
};

export default Login;
