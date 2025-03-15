import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { getExchangeRates } from "@/services/exchangeRates";

interface ProgressBarProps {
  totalSpent: number;
  budgetAmount: number;
  currency: string;
}

const ProgressBar = ({ totalSpent, budgetAmount, currency }: ProgressBarProps) => {
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await getExchangeRates("USD");
      if (rates && rates[currency]) {
        setExchangeRate(rates[currency]);
      }
    };
    fetchRates();
  }, [currency]);

  const convertedSpent = totalSpent * exchangeRate;
  const convertedBudget = budgetAmount * exchangeRate;
  const progress = Math.min((convertedSpent / convertedBudget) * 100, 100);

  return (
    <div className="w-full">
      <p className="text-sm mb-1">
        Used: {new Intl.NumberFormat("id-ID", { style: "currency", currency }).format(convertedSpent)} / {new Intl.NumberFormat("id-ID", { style: "currency", currency }).format(convertedBudget)}
      </p>
      <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};

export default ProgressBar;
