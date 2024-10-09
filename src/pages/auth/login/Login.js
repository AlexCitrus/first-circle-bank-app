// src/pages/auth/Login.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Button, FlexboxGrid, Form, Panel } from "rsuite";
import "./login.css";

const copy = {
  title: "Login",
  email: "Email",
  password: "Password",
  loginButton: "Login",
  noAccount: "Don't have an account?",
  registerNow: "Register Now",
  loginSuccess: "Login successful!",
  invalidCredentials: "Invalid credentials. Please try again."
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, users } = useAuth();

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      login(email);
      alert(copy.loginSuccess);
      navigate("/dashboard");
    } else {
      alert(copy.invalidCredentials);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <FlexboxGrid justify="center" align="middle" className="login-container">
      <Panel bordered className="login-panel">
        <h2 className="login-title">{copy.title}</h2>
        <Form fluid onSubmit={handleLogin}>
          <Form.Group controlId="email-1">
            <Form.ControlLabel>{copy.email}</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              className="login-form-control"
            />
          </Form.Group>
          <Form.Group controlId="password-1">
            <Form.ControlLabel>{copy.password}</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={setPassword}
              required
              className="login-form-control"
            />
          </Form.Group>
          <Form.Group>
            <Button
              appearance="primary"
              type="submit"
              block
              size="lg"
              className="login-button"
            >
              {copy.loginButton}
            </Button>
          </Form.Group>
        </Form>
        <div className="login-register-section">
          <p className="login-register-text">{copy.noAccount}</p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button appearance="ghost" className="login-register-button">
              {copy.registerNow}
            </Button>
          </Link>
        </div>
      </Panel>
    </FlexboxGrid>
  );
};

export default Login;
