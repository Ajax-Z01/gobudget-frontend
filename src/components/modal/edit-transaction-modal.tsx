import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";
import { Category, Transaction } from "@/types/type";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  categories: Category[];
  onClose: () => void;
  onSave: (updatedTransaction: Transaction) => void;
  refreshData: () => Promise<void>;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, categories, onClose, onSave }) => {
  const { theme } = useTheme();
  const [editedTransaction, setEditedTransaction] = useState<Transaction>({
    id: transaction?.id || 0,
    note: transaction?.note || "",
    amount: transaction?.amount || 0,
    type: transaction?.type || "Income",
    category_id: transaction?.category_id || 0,
    category: { id: 0, name: "" },
    user_id: transaction?.user_id || 0,
    created_at: transaction?.created_at || "",
    updated_at: transaction?.updated_at || "",
    deleted_at: transaction?.deleted_at || null,
  });

  if (!transaction) return null; // Jika tidak ada transaksi, modal tidak ditampilkan

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value, // Pastikan amount tetap number
    }));
  };

  const handleSave = () => {
    if (!editedTransaction?.note?.trim() || editedTransaction.amount <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }
    if (editedTransaction.category_id === 0) {
      alert("Please select a valid category.");
      return;
    }
    onSave({ ...editedTransaction, note: editedTransaction.note ?? "" });
    onClose();
  };  

  return (
    <div className="modal-wrapper">
      <div className="modal" data-theme={theme}>
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
        <select name="type" value={editedTransaction.type} onChange={handleChange} className="modal-input">
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select name="category_id" value={editedTransaction.category_id} onChange={handleChange} className="modal-input">
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
      </div>
    </div>
  );
};

export default EditTransactionModal;
