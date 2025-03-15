import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Category, Transaction } from "@/types/type";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";

interface AddTransactionModalProps {
  onClose: () => void;
  onSave: (newTransaction: Transaction) => void;
  categories: Category[];
  refreshData: () => Promise<void>;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onSave, categories }) => {
  const { theme } = useTheme();
  const { language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    note: "",
    amount: 0,
    type: "Income",
    category_id: categories.length > 0 ? categories[0].id : 0,
    category: { id: 0, name: "" },
    user_id: 0,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  });

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
      alert(t.enter_valid_transaction);
      return;
    }
    if (newTransaction.category_id === 0) {
      alert(t.select_valid_category);
      return;
    }
    onSave(newTransaction);
    onClose();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal" data-theme={theme}>
        <p className="modal-heading">{t.add_transaction}</p>
        <input
          type="text"
          name="note"
          value={newTransaction.note}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          className="modal-input"
          placeholder={t.transaction_note}
        />
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          className="modal-input"
          placeholder={t.transaction_amount}
        />
        <select
          name="type"
          value={newTransaction.type}
          onChange={handleChange}
          className="modal-input"
        >
          <option value="Income">{t.income}</option>
          <option value="Expense">{t.expense}</option>
        </select>
        <select
          name="category_id"
          value={newTransaction.category_id}
          onChange={handleChange}
          className="modal-input"
        >
          <option value="">{t.select_category}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="button-wrapper flex justify-between mt-4">
          <button onClick={handleSave} className="save-button">{t.save}</button>
          <button onClick={onClose} className="cancel-button">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
