import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBankAccount } from "../../../context/BankAccountContext";
import { useAuth } from "../../../context/AuthContext";
import { FlexboxGrid, Panel, Button, Form, InputNumber, Input } from "rsuite";
import "./transfer.css";

const transferCopy = {
  title: "Transfer",
  currentBalance: "Current Balance:",
  recipientEmail: "Recipient Email",
  amountToTransfer: "Amount to Transfer",
  transferButton: "Transfer",
  backToDashboard: "Back to Dashboard",
  invalidAmountAlert: "Please enter a valid amount to transfer.",
  insufficientFundsAlert: "Insufficient funds. Please enter a smaller amount.",
  emptyRecipientAlert: "Please enter a recipient email.",
  selfTransferAlert: "You cannot transfer money to your own account.",
  nonExistentRecipientAlert: "Recipient email does not exist. Please check the email and try again.",
  successAlert: (amount, email) => `Successfully transferred ₱${amount} to ${email}`
};

const Transfer = () => {
  const [amount, setAmount] = useState(0);
  const [recipientEmail, setRecipientEmail] = useState("");
  const { transfer, accountBalance } = useBankAccount();
  const { users, currentEmail } = useAuth();
  const navigate = useNavigate();

  const handleTransfer = () => {
    if (amount <= 0) {
      alert(transferCopy.invalidAmountAlert);
      return;
    }
    if (amount > accountBalance) {
      alert(transferCopy.insufficientFundsAlert);
      return;
    }
    if (!recipientEmail) {
      alert(transferCopy.emptyRecipientAlert);
      return;
    }
    if (recipientEmail === currentEmail) {
      alert(transferCopy.selfTransferAlert);
      return;
    }

    const recipientExists = users.some((user) => user.email === recipientEmail);

    if (!recipientExists) {
      alert(transferCopy.nonExistentRecipientAlert);
      return;
    }

    try {
      transfer(recipientEmail, amount);
      alert(transferCopy.successAlert(amount, recipientEmail));
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FlexboxGrid justify="center" align="middle" className="transfer-container">
      <Panel bordered className="transfer-panel">
        <h2 className="transfer-title">{transferCopy.title}</h2>
        <div className="transfer-balance">
          {transferCopy.currentBalance} ₱
          {accountBalance.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <Form fluid onSubmit={handleTransfer}>
          <Form.Group>
            <Form.ControlLabel>{transferCopy.recipientEmail}</Form.ControlLabel>
            <Input
              value={recipientEmail}
              onChange={setRecipientEmail}
              type="email"
              className="transfer-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{transferCopy.amountToTransfer}</Form.ControlLabel>
            <InputNumber
              value={amount}
              onChange={setAmount}
              step={0.01}
              min={0}
              max={accountBalance}
              className="transfer-input"
            />
          </Form.Group>
          <Button
            appearance="primary"
            type="submit"
            block
            size="lg"
            className="transfer-button"
          >
            {transferCopy.transferButton}
          </Button>
          <Button
            appearance="subtle"
            block
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="back-button"
          >
            {transferCopy.backToDashboard}
          </Button>
        </Form>
      </Panel>
    </FlexboxGrid>
  );
};

export default Transfer;
