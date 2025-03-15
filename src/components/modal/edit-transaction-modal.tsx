import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Category, Transaction } from "@/types/type";
import { translations } from "@/utils/translations";
import { useSettings } from "@/app/context/SettingContext";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  categories: Category[];
  onClose: () => void;
  onSave: (updatedTransaction: Transaction) => void;
  refreshData: () => Promise<void>;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, categories, onClose, onSave }) => {
  const { theme } = useTheme();
  const { language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

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

  if (!transaction) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (!editedTransaction?.note?.trim() || editedTransaction.amount <= 0) {
      alert(t.enter_valid_transaction);
      return;
    }
    if (editedTransaction.category_id === 0) {
      alert(t.select_valid_category);
      return;
    }
    onSave({ ...editedTransaction, note: editedTransaction.note ?? "" });
    onClose();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal" data-theme={theme}>
        <p className="modal-heading">{t.edit}</p>
        <input
          type="text"
          name="note"
          value={editedTransaction.note}
          onChange={handleChange}
          className="modal-input"
          placeholder={t.transaction_note}
        />
        <input
          type="number"
          name="amount"
          value={editedTransaction.amount}
          onChange={handleChange}
          className="modal-input"
          placeholder={t.transaction_amount}
        />
        <select name="type" value={editedTransaction.type} onChange={handleChange} className="modal-input">
          <option value="Income">{t.income}</option>
          <option value="Expense">{t.expense}</option>
        </select>
        <select name="category_id" value={editedTransaction.category_id} onChange={handleChange} className="modal-input">
          <option value="0">{t.select_category}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="button-wrapper flex justify-between mt-4">
          <button onClick={handleSave} className="edit-button">{t.edit}</button>
          <button onClick={onClose} className="cancel-button">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;
