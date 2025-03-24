import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Category, Transaction } from "@/types/type";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";
import { getExchangeRates } from "@/services/exchangeRates";

interface AddTransactionModalProps {
  onClose: () => void;
  onSave: (newTransaction: Transaction) => void;
  categories: Category[];
  refreshData: () => Promise<void>;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onSave, categories }) => {
  const { theme } = useTheme();
  const { language, currency: defaultCurrency } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  const [amountInput, setAmountInput] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loadingRate, setLoadingRate] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(defaultCurrency);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    note: "",
    amount: 0,
    currency: defaultCurrency,
    exchange_rate: 1,
    type: "Income",
    category_id: categories.length > 0 ? categories[0].id : 0,
    category: categories.length > 0 ? categories[0] : { id: 0, name: "" },
    user_id: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  });

  useEffect(() => {
    const fetchRates = async () => {
      if (!selectedCurrency) return;
  
      if (selectedCurrency === "IDR") {
        setExchangeRate(1);
        setNewTransaction((prev) => ({
          ...prev,
          currency: "IDR",
          exchange_rate: 1,
        }));
        return;
      }
  
      setLoadingRate(true);
      try {
        const rates = await getExchangeRates(selectedCurrency);
        const rate = rates["IDR"] || 1;
  
        setExchangeRate(rate);
        setNewTransaction((prev) => ({
          ...prev,
          currency: selectedCurrency,
          exchange_rate: rate,
        }));
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
        setExchangeRate(1);
        setNewTransaction((prev) => ({
          ...prev,
          currency: selectedCurrency,
          exchange_rate: 1,
        }));
      }
      setLoadingRate(false);
    };
  
    fetchRates();
  }, [selectedCurrency]);  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "amount") {
      setAmountInput(value);
      const parsedAmount = parseFloat(value);
      if (!isNaN(parsedAmount)) {
        setNewTransaction((prev) => ({ ...prev, amount: parsedAmount }));
      }
    } else if (name === "category_id") {
      const selectedCategory = categories.find((cat) => cat.id === parseInt(value, 10)) || { id: 0, name: "" };
      setNewTransaction((prev) => ({ ...prev, category_id: selectedCategory.id, category: selectedCategory }));
    } else if (name === "currency") {
      setSelectedCurrency(value);
      setNewTransaction((prev) => ({ ...prev, currency: value }));
    } else {
      setNewTransaction((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!newTransaction.note || newTransaction.amount <= 0) {
      alert(t.enter_valid_transaction);
      return;
    }
    if (!newTransaction.category_id) {
      alert(t.select_valid_category);
      return;
    }
  
    if (!newTransaction.currency || newTransaction.exchange_rate === 0) {
      alert("Currency and exchange rate must be valid.");
      return;
    }
  
    console.log("Saving transaction:", newTransaction);
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
          className="modal-input"
          placeholder={t.transaction_note}
        />

        <div className="flex gap-2">
          {/* Dropdown Currency */}
          <select
            name="currency"
            value={selectedCurrency}
            onChange={handleChange}
            className="modal-input w-1/3"
          >
            <option value="IDR">IDR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </select>

          {/* Amount Input */}
          <input
            type="number"
            name="amount"
            value={amountInput}
            onChange={handleChange}
            className="modal-input w-2/3"
            placeholder={`${t.transaction_amount} (${selectedCurrency})`}
          />
        </div>

        {/* Exchange Rate Display */}
        {selectedCurrency !== "IDR" && (
          <div className="flex gap-2 mt-2 items-center">
            <label className="text-sm">{t.exchange_rate}: </label>
            <input
              type="text"
              name="exchange_rate"
              value={`1 ${selectedCurrency} = ${exchangeRate} IDR`}
              disabled
              className="modal-input w-full bg-gray-200 dark:bg-gray-700"
            />
            {loadingRate && <p className="text-sm text-gray-500">{t.loading_exchange_rate}...</p>}
          </div>
        )}

        <select name="type" value={newTransaction.type} onChange={handleChange} className="modal-input">
          <option value="Income">{t.income}</option>
          <option value="Expense">{t.expense}</option>
        </select>

        <select name="category_id" value={newTransaction.category_id || 0} onChange={handleChange} className="modal-input">
          <option value="0">{t.select_category}</option>
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
