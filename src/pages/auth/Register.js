import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, FlexboxGrid, Form, Panel } from "rsuite";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const handleRegister = () => {
    try {
      register(email, password, accountBalance);
      alert("Registration successful!");
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
          Register
        </h2>
        <Form fluid onSubmit={handleRegister}>
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
          <Form.Group controlId="account-balance-1">
            <Form.ControlLabel>Initial Deposit ($)</Form.ControlLabel>
            <Form.Control
              name="accountBalance"
              type="number"
              value={accountBalance}
              onChange={setAccountBalance}
              min="10"
              step="0.01"
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
              Register
            </Button>
          </Form.Group>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#34495e" }}>Already have an account?</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              appearance="ghost"
              style={{
                color: "#3498db",
                fontWeight: "bold",
                marginTop: "10px"
              }}
            >
              Login Now
            </Button>
          </Link>
        </div>
      </Panel>
    </FlexboxGrid>
  );
};

export default Register;
