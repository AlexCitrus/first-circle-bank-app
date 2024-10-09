import React from "react";
import { Link } from "react-router-dom";
import { useBankAccount } from "../../context/BankAccountContext";
import { FlexboxGrid, Panel, Button, ButtonToolbar } from "rsuite";

import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import SplitIcon from "@rsuite/icons/Split";
import ExitIcon from "@rsuite/icons/Exit";

import "./dashboard.css";

const dashboardCopy = {
  title: "Dashboard",
  welcome: "Welcome",
  currentBalance: "Current Balance:",
  deposit: "Deposit",
  withdraw: "Withdraw",
  transfer: "Transfer",
  signOut: "Sign Out"
};

const Dashboard = () => {
  const { username, accountBalance } = useBankAccount();

  return (
    <FlexboxGrid
      justify="center"
      align="middle"
      className="dashboard-container"
    >
      <Panel bordered className="dashboard-panel">
        <h2 className="dashboard-title">{dashboardCopy.title}</h2>
        <p className="dashboard-welcome">
          {dashboardCopy.welcome},{" "}
          <span className="dashboard-welcome-name">{username}</span>!
        </p>
        <div className="dashboard-balance">
          {dashboardCopy.currentBalance}{" "}
          <span className="dashboard-balance-amount">
            ₱
            {accountBalance.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        </div>
        <ButtonToolbar className="dashboard-button-toolbar">
          <Button
            appearance="primary"
            block
            size="lg"
            as={Link}
            to="/deposit"
            className="dashboard-button dashboard-button-deposit"
          >
            <PlusIcon className="dashboard-button-icon" />{" "}
            {dashboardCopy.deposit}
          </Button>
          <Button
            appearance="primary"
            block
            size="lg"
            as={Link}
            to="/withdraw"
            className="dashboard-button dashboard-button-withdraw"
          >
            <MinusIcon className="dashboard-button-icon" />{" "}
            {dashboardCopy.withdraw}
          </Button>
          <Button
            appearance="primary"
            block
            size="lg"
            as={Link}
            to="/transfer"
            className="dashboard-button dashboard-button-transfer"
          >
            <SplitIcon className="dashboard-button-icon" />{" "}
            {dashboardCopy.transfer}
          </Button>
          <Button
            as={Link}
            to="/signout"
            appearance="subtle"
            block
            size="lg"
            className="dashboard-button-signout"
          >
            <ExitIcon className="dashboard-button-icon" />{" "}
            {dashboardCopy.signOut}
          </Button>
        </ButtonToolbar>
      </Panel>
    </FlexboxGrid>
  );
};

export default Dashboard;
