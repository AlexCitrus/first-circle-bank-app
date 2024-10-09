import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Button, FlexboxGrid, Form, Panel } from "rsuite";
import "./register.css";

const copy = {
  title: "Register",
  email: "Email",
  password: "Password",
  initialDeposit: "Initial Deposit ($)",
  registerButton: "Register",
  alreadyHaveAccount: "Already have an account?",
  loginNow: "Login Now",
  registrationSuccessful: "Registration successful!"
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const handleRegister = () => {
    try {
      register(email, password, accountBalance);
      alert(copy.registrationSuccessful);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <FlexboxGrid justify="center" align="middle" className="register-container">
      <Panel bordered className="register-panel">
        <h2 className="register-title">{copy.title}</h2>
        <Form fluid onSubmit={handleRegister}>
          <Form.Group controlId="email-1">
            <Form.ControlLabel>{copy.email}</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              className="register-form-control"
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
              className="register-form-control"
            />
          </Form.Group>
          <Form.Group controlId="account-balance-1">
            <Form.ControlLabel>{copy.initialDeposit}</Form.ControlLabel>
            <Form.Control
              name="accountBalance"
              type="number"
              value={accountBalance}
              onChange={setAccountBalance}
              min="10"
              step="0.01"
              required
              className="register-form-control"
            />
          </Form.Group>
          <Form.Group>
            <Button
              appearance="primary"
              type="submit"
              block
              size="lg"
              className="register-button"
            >
              {copy.registerButton}
            </Button>
          </Form.Group>
        </Form>
        <div className="register-login-section">
          <p className="register-login-text">{copy.alreadyHaveAccount}</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button appearance="ghost" className="register-login-button">
              {copy.loginNow}
            </Button>
          </Link>
        </div>
      </Panel>
    </FlexboxGrid>
  );
};

export default Register;
