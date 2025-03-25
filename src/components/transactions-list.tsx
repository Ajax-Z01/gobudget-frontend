import React, { useEffect, useMemo, useState, useRef } from "react";
import { Transaction } from "@/types/type";
import { Button } from "@/components/ui/button";
import { getExchangeRates } from "@/services/exchangeRates";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";

type TransactionListProps = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchedCurrencies = useRef(new Set());
  const { currency, language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];
  const localeMap: Record<string, string> = {
    English: "en-US",
    Bahasa: "id-ID",
  };
  const currentLocale = localeMap[language] || "en-US";

  const uniqueCurrencies = useMemo(() => {
    return Array.from(new Set(transactions.map((tx) => tx.currency)));
  }, [transactions]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        const ratesData: { [key: string]: number } = { ...exchangeRates };

        for (const curr of uniqueCurrencies) {
          if (!fetchedCurrencies.current.has(curr)) {
            const rates = await getExchangeRates(curr);
            if (rates) {
              ratesData[curr] = rates[currency] || 1;
              fetchedCurrencies.current.add(curr);
            }
          }
        }

        if (Object.keys(ratesData).length !== Object.keys(exchangeRates).length) {
          setExchangeRates(ratesData);
        }
      } catch (error) {
        console.error("❌ Error fetching exchange rates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (uniqueCurrencies.length > 0) {
      fetchRates();
    } else {
      setIsLoading(false);
    }
  }, [uniqueCurrencies, currency, exchangeRates]);

  const convertedTransactions = useMemo(() => {
    return transactions.map((tx) => ({
      ...tx,
      convertedAmount: tx.amount * (exchangeRates[tx.currency] || 1),
    }));
  }, [transactions, exchangeRates]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(currentLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat(currentLocale, { style: "currency", currency }).format(amount);

  return (
    <div className="mt-4 p-2">
      <h2 className="text-lg font-medium title-name">{t.transactions_list}</h2>
      <div className="mt-4 card shadow overflow-hidden sm:rounded-md">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--border-color)]">
            {convertedTransactions.length > 0 ? (
              convertedTransactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="hover:bg-[var(--border-color)] dark:hover:bg-[var(--border-color)] transition-all"
                >
                  <div className="px-4 py-4 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-medium card-title truncate">
                        {transaction.note || t.no_data}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-[var(--foreground)]">
                        <span>{formatDate(transaction.created_at)}</span>
                      </div>
                      <span
                        className={`mt-2 inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                          transaction.type === "Income"
                            ? "bg-[var(--primary)] text-[var(--text-black)]"
                            : "bg-[var(--tertiary)] text-[var(--text-black)]"
                        }`}
                      >
                        {transaction.type === "Income" ? t.income : t.expense}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                      <span
                        className={`text-lg font-semibold ${
                          transaction.type === "Income" ? "text-[var(--primary)]" : "text-[var(--tertiary)]"
                        }`}
                      >
                        {formatAmount(transaction.convertedAmount)}
                      </span>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button variant="secondary" onClick={() => onEdit(transaction)}>
                          {t.edit}
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(transaction.id)}>
                          {t.delete}
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 text-center text-gray-500">{t.no_data}</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
