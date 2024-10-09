import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBankAccount } from "../../../context/BankAccountContext";
import { FlexboxGrid, Panel, Button, Form, InputNumber } from "rsuite";
import "./deposit.css";

const copy = {
  title: "Deposit",
  currentBalance: "Current Balance:",
  amountToDeposit: "Amount to Deposit",
  depositButton: "Deposit",
  backToDashboard: "Back to Dashboard",
  invalidAmountAlert: "Please enter a valid amount to deposit.",
  successAlert: "Successfully deposited ₱"
};

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const { deposit, accountBalance } = useBankAccount();
  const navigate = useNavigate();

  const handleDeposit = () => {
    if (amount <= 0) {
      alert(copy.invalidAmountAlert);
      return;
    }
    deposit(amount);
    alert(`${copy.successAlert}${amount}`);
    navigate("/dashboard");
  };

  return (
    <FlexboxGrid justify="center" align="middle" className="deposit-container">
      <Panel bordered className="deposit-panel">
        <h2 className="deposit-title">{copy.title}</h2>
        <div className="deposit-balance">
          {copy.currentBalance} ₱
          {accountBalance.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <Form fluid onSubmit={handleDeposit}>
          <Form.Group>
            <Form.ControlLabel>{copy.amountToDeposit}</Form.ControlLabel>
            <InputNumber
              value={amount}
              onChange={setAmount}
              step={0.01}
              min={0}
              className="deposit-input"
            />
          </Form.Group>
          <Button
            appearance="primary"
            type="submit"
            block
            size="lg"
            className="deposit-button"
          >
            {copy.depositButton}
          </Button>
          <Button
            appearance="subtle"
            block
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="back-button"
          >
            {copy.backToDashboard}
          </Button>
        </Form>
      </Panel>
    </FlexboxGrid>
  );
};

export default Deposit;
