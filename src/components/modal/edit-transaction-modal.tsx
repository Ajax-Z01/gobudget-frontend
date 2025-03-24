import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Category, Transaction } from "@/types/type";
import { translations } from "@/utils/translations";
import { useSettings } from "@/app/context/SettingContext";
import { getExchangeRates } from "@/services/exchangeRates";

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
  const [loadingRate, setLoadingRate] = useState<boolean>(false);

  const [editedTransaction, setEditedTransaction] = useState<Transaction>({
    id: transaction?.id || 0,
    note: transaction?.note || "",
    amount: transaction?.amount || 0,
    currency: transaction?.currency || "IDR",
    exchange_rate: transaction?.exchange_rate || 1,
    type: transaction?.type || "Income",
    category_id: transaction?.category_id || 0,
    category: transaction?.category || { id: 0, name: "" },
    user_id: transaction?.user_id || 0,
    created_at: transaction?.created_at || "",
    updated_at: transaction?.updated_at || "",
    deleted_at: transaction?.deleted_at || null,
  });
  
  useEffect(() => {
    const fetchRates = async () => {
      if (!transaction || !editedTransaction.currency) return;
  
      if (editedTransaction.currency === "IDR") {
        setEditedTransaction((prev) => ({
          ...prev,
          exchange_rate: 1,
        }));
        return;
      }
  
      setLoadingRate(true);
      try {
        const rates = await getExchangeRates(editedTransaction.currency);
        setEditedTransaction((prev) => ({
          ...prev,
          exchange_rate: rates["IDR"] || 1,
        }));
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
        setEditedTransaction((prev) => ({
          ...prev,
          exchange_rate: 1,
        }));
      }
      setLoadingRate(false);
    };
  
    fetchRates();
  }, [transaction, editedTransaction.currency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "amount") {
      setEditedTransaction((prev) => ({
        ...prev,
        amount: Number(value),
      }));
    } else if (name === "category_id") {
      const selectedCategory = categories.find((cat) => cat.id === parseInt(value, 10)) || { id: 0, name: "" };
      setEditedTransaction((prev) => ({
        ...prev,
        category_id: selectedCategory.id,
        category: selectedCategory,
      }));
    } else {
      setEditedTransaction((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    if (!editedTransaction.currency || editedTransaction.exchange_rate === 0) {
      alert("Currency and exchange rate must be valid.");
      return;
    }

    onSave({ ...editedTransaction, note: editedTransaction.note ?? "" });
    onClose();
  };
  
  if (!transaction) return null;

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
        <div className="relative flex items-center">
          <div className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-l-md">
            {editedTransaction.currency}
          </div>
          <input
            type="number"
            name="amount"
            value={editedTransaction.amount}
            onChange={handleChange}
            className="modal-input rounded-l-none"
            placeholder={`${t.transaction_amount} (${editedTransaction.currency})`}
          />
        </div>
        {loadingRate && editedTransaction.currency !== "IDR" && (
          <p className="text-sm text-[var(--foreground)] mt-1">{t.loading_exchange_rate}...</p>
        )}
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
          <button onClick={handleSave} className="edit-button">{t.save}</button>
          <button onClick={onClose} className="cancel-button">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;