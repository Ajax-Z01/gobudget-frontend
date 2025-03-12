import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

interface Category {
  id: number;
  name: string;
}

interface Transaction {
  id: number;
  note: string;
  amount: number;
  type: "Income" | "Expense";
  category_id: number;
}

interface EditTransactionModalProps {
  transaction: Transaction | null;
  categories: Category[];
  onClose: () => void;
  onSave: (updatedTransaction: Transaction) => void;
  refreshData: () => Promise<void>;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, categories, onClose, onSave }) => {
  const { theme } = useTheme();
  const [editedTransaction, setEditedTransaction] = useState<Transaction>(
    transaction || { id: 0, note: "", amount: 0, type: "Income", category_id: categories.length > 0 ? categories[0].id : 0 }
  );

  if (!transaction) return null; // Jika tidak ada transaksi, modal tidak ditampilkan

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value, // Pastikan amount tetap number
    }));
  };

  const handleSave = () => {
    if (!editedTransaction.note.trim() || editedTransaction.amount <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }
    if (editedTransaction.category_id === 0) {
      alert("Please select a valid category.");
      return;
    }
    onSave(editedTransaction);
    onClose();
  };

  return (
    <StyledWrapper>
      <StyledModal data-theme={theme}>
        <p className="modal-heading">Edit Transaction</p>
        <input
          type="text"
          name="note"
          value={editedTransaction.note}
          onChange={handleChange}
          className="modal-input"
          placeholder="Note"
        />
        <input
          type="number"
          name="amount"
          value={editedTransaction.amount}
          onChange={handleChange}
          className="modal-input"
          placeholder="Amount"
        />
        <select
          name="type"
          value={editedTransaction.type}
          onChange={handleChange}
          className="modal-input"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          name="category_id"
          value={editedTransaction.category_id}
          onChange={handleChange}
          className="modal-input"
        >
          <option value="0">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
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
    --border-color: #475569;
  }

  &[data-theme="light"] {
    --bg-color: white;
    --text-color: black;
    --border-color: #ccc;
  }

  .modal-input {
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background: var(--bg-color);
    color: var(--text-color);
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

export default EditTransactionModal;
