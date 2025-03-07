import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

interface Transaction {
  note: string;
  amount: number;
  type: "Income" | "Expense";
}

interface AddTransactionModalProps {
  onClose: () => void;
  onSave: (newTransaction: Transaction) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onSave }) => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    note: "",
    amount: 0,
    type: "Income",
  });

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = () => {
    if (!newTransaction.note || newTransaction.amount <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }
    onSave(newTransaction);
    onClose();
  };

  return (
    <StyledWrapper>
      <StyledModal data-theme={currentTheme}>
        <p className="modal-heading">Add Transaction</p>
        <input
          type="text"
          name="note"
          value={newTransaction.note}
          onChange={handleChange}
          className="modal-input"
          placeholder="Note"
        />
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleChange}
          className="modal-input"
          placeholder="Amount"
        />
        <select
          name="type"
          value={newTransaction.type}
          onChange={handleChange}
          className="modal-input"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <div className="button-wrapper">
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </StyledModal>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div`
  background: var(--bg-color);
  color: var(--text-color);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &[data-theme="dark"] {
    --bg-color: #1e293b;
    --text-color: white;
  }

  &[data-theme="light"] {
    --bg-color: white;
    --text-color: black;
  }

  .modal-heading {
    font-size: 18px;
    font-weight: bold;
  }

  .modal-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: var(--bg-color);
    color: var(--text-color);
    border-color: var(--text-color);
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .save-button {
    background-color: green;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: darkgreen;
    }
  }

  .cancel-button {
    background-color: red;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: darkred;
    }
  }
`;

export default AddTransactionModal;
