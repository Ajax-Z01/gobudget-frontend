import { useEffect, useState, useRef } from "react";
import { getExchangeRates } from "@/services/exchangeRates";
import { useSettings } from "@/app/context/SettingContext";
import { getTransactions } from "@/services/transactions";
import { Transaction } from "@/types/type";
import Link from "next/link";
import { translations } from "@/utils/translations";

const RecentActivity = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchedCurrencies = useRef(new Set());
  const { currency, language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsData = await getTransactions();
        setTransactions(transactionsData.slice(-5).reverse());
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      const uniqueCurrencies = Array.from(new Set(transactions.map((tx) => tx.currency)));
      const ratesData: { [key: string]: number } = { ...exchangeRates };

      for (const curr of uniqueCurrencies) {
        if (!fetchedCurrencies.current.has(curr)) {
          try {
            const rates = await getExchangeRates(curr);
            if (rates) {
              ratesData[curr] = rates[currency] || 1;
              fetchedCurrencies.current.add(curr);
            }
          } catch (error) {
            console.error(`❌ Error fetching exchange rate for ${curr}:`, error);
          }
        }
      }

      if (Object.keys(ratesData).length !== Object.keys(exchangeRates).length) {
        setExchangeRates(ratesData);
      }
    };

    if (transactions.length > 0) {
      fetchRates();
    }
  }, [transactions, currency, exchangeRates]);

  useEffect(() => {
    if (transactions.length > 0 && Object.keys(exchangeRates).length > 0) {
      setIsLoading(false);
    }
  }, [transactions, exchangeRates]);

  const convertCurrency = (amount: number, transactionCurrency: string) => {
    if (transactionCurrency === currency) return amount;
    return amount * (exchangeRates[transactionCurrency] || 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "English" ? "en-US" : "id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium title-name">{t.recent_activity}</h2>
      <div className="mt-4 card shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-[var(--border-color)]">
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const convertedAmount = convertCurrency(transaction.amount, transaction.currency);

              return (
                <li key={transaction.id}>
                  <Link
                    href="/transactions"
                    className="block hover:bg-[var(--border-color)] dark:hover:bg-[var(--border-color)] transition-all"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium card-title truncate">
                          {t.transaction} | {transaction.category?.name || t.uncategorized}
                        </div>
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-[var(--primary)] text-black">
                          {t.completed}
                        </span>
                      </div>

                      <div className="mt-2 flex justify-between text-sm text-[var(--foreground)]">
                        <div className="flex items-center">
                          <span>{formatDate(transaction.created_at)}</span>
                        </div>

                        <div className="flex items-center">
                          <span>
                            {new Intl.NumberFormat(language === "English" ? "en-US" : "id-ID", {
                              style: "currency",
                              currency: currency,
                            }).format(convertedAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-4 text-center text-gray-500">{t.no_data}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
