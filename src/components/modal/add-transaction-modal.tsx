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
  const { language, currency } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  const [amountInput, setAmountInput] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loadingRate, setLoadingRate] = useState<boolean>(false);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    note: "",
    amount: 0,
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
      if (currency === "USD") {
        console.log("Currency is USD, no conversion needed.");
        setExchangeRate(1);
        return;
      }
  
      setLoadingRate(true);
      try {
        const rates = await getExchangeRates("USD");
        console.log("Fetched exchange rates:", rates);
  
        const usdToIdrRate = rates["IDR"]; 
  
        if (usdToIdrRate && usdToIdrRate > 0) {
          console.log(`1 USD = ${usdToIdrRate} ${currency}`);
          setExchangeRate(usdToIdrRate);
        } else {
          console.warn("Invalid exchange rate from API, using default 1.");
          setExchangeRate(1);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
        setExchangeRate(1);
      }
      setLoadingRate(false);
    };
  
    fetchRates();
  }, [currency]);   

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
  
      if (isNaN(parsedAmount)) {
        console.warn("Invalid amount input:", value);
        return;
      }
      
      const amountInUSD = currency !== "USD" ? parsedAmount / exchangeRate : parsedAmount;
  
      setNewTransaction((prev) => ({ ...prev, amount: parseFloat(amountInUSD.toFixed(2)) }));
    } else if (name === "category_id") {
      const selectedCategory = categories.find((cat) => cat.id === parseInt(value, 10)) || { id: 0, name: "" };
      setNewTransaction((prev) => ({ ...prev, category_id: selectedCategory.id, category: selectedCategory }));
    } else {
      setNewTransaction((prev) => ({ ...prev, [name]: value }));
    }
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
        <div className="relative flex items-center">
          <div className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-l-md">
            {currency}
          </div>
          <input
            type="number"
            name="amount"
            value={amountInput}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            className="modal-input rounded-l-none"
            placeholder={`${t.transaction_amount} (${currency})`}
          />
        </div>
        {currency !== "USD" && !loadingRate && (
          <p className="text-sm text-[var(--foreground)] mt-1">
            {t.converted_to_usd}: ${newTransaction.amount.toFixed(2)}
          </p>
        )}
        {loadingRate && currency !== "USD" && (
          <p className="text-sm text-[var(--foreground)] mt-1">{t.loading_exchange_rate}...</p>
        )}
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
