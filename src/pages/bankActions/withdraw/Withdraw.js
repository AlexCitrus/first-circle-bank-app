import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBankAccount } from "../../../context/BankAccountContext";
import { FlexboxGrid, Panel, Button, Form, InputNumber } from "rsuite";
import "./withdraw.css";

const withdrawCopy = {
  title: "Withdraw",
  currentBalance: "Current Balance:",
  amountToWithdraw: "Amount to Withdraw",
  withdrawButton: "Withdraw",
  backToDashboard: "Back to Dashboard",
  invalidAmountAlert: "Please enter a valid amount to withdraw.",
  insufficientFundsAlert: "Insufficient funds. Please enter a smaller amount.",
  successAlert: (amount) => `Successfully withdrew ₱${amount}`
};

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const { withdraw, accountBalance } = useBankAccount();
  const navigate = useNavigate();

  const handleWithdraw = () => {
    if (amount <= 0) {
      alert(withdrawCopy.invalidAmountAlert);
      return;
    }
    if (amount > accountBalance) {
      alert(withdrawCopy.insufficientFundsAlert);
      return;
    }
    withdraw(amount);
    alert(withdrawCopy.successAlert(amount));
    navigate("/dashboard");
  };

  return (
    <FlexboxGrid justify="center" align="middle" className="withdraw-container">
      <Panel bordered className="withdraw-panel">
        <h2 className="withdraw-title">{withdrawCopy.title}</h2>
        <div className="withdraw-balance">
          {withdrawCopy.currentBalance} ₱
          {accountBalance.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <Form fluid onSubmit={handleWithdraw}>
          <Form.Group>
            <Form.ControlLabel>
              {withdrawCopy.amountToWithdraw}
            </Form.ControlLabel>
            <InputNumber
              value={amount}
              onChange={setAmount}
              step={0.01}
              min={0}
              max={accountBalance}
              className="withdraw-input"
            />
          </Form.Group>
          <Button
            appearance="primary"
            type="submit"
            block
            size="lg"
            className="withdraw-button"
          >
            {withdrawCopy.withdrawButton}
          </Button>
          <Button
            appearance="subtle"
            block
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="back-button"
          >
            {withdrawCopy.backToDashboard}
          </Button>
        </Form>
      </Panel>
    </FlexboxGrid>
  );
};

export default Withdraw;
