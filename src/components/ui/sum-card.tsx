import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { getExchangeRates } from "@/services/exchangeRates";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";

const Card: React.FC<{ title: string; value: string; color: string; icon: JSX.Element }> = ({ title, value, color, icon }) => {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const { currency, language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await getExchangeRates("USD");
      if (rates) setExchangeRates(rates);
    };
    fetchRates();
  }, []);

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return amount;
    return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  };

  const convertedValue = convertCurrency(Number(value), "USD", currency);

  return (
    <div className="card overflow-hidden shadow-lg rounded-lg">
      <div className="p-5 flex items-center">
        <div className="flex-shrink-0 rounded-md p-3" style={{ backgroundColor: `var(--${color})` }}>
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </div>
        <div className="ml-5 flex-1">
          <dl>
            <dt className="text-sm font-medium truncate card-title">{title}</dt>
            <dd className="text-lg font-medium" style={{ color: "var(--card-text)" }}>
              {new Intl.NumberFormat(language === "Bahasa" ? "id-ID" : "en-US", { style: "currency", currency }).format(convertedValue)}
            </dd>
          </dl>
        </div>
      </div>
      <div className="px-5 py-3" style={{ backgroundColor: "var(--border-color)" }}>
        <div className="text-sm">
          <Link href="/reports" className="font-medium hover:underline" style={{ color: "var(--card-text)" }}>
            {t.view_all}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
