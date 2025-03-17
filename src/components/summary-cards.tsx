import Card from "./ui/sum-card";
import { translations } from "@/utils/translations";
import { useSettings } from "@/app/context/SettingContext";

interface Summary {
  balance: number;
  total_income: number;
  total_expense: number;
}

const SummaryCards: React.FC<{ summary: Summary }> = ({ summary }) => {
  const { language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Balance Card */}
        <Card 
          title={t.final_balance} 
          value={summary?.balance?.toFixed(2) || "0.00"} 
          color="secondary" 
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          }
        />
        {/* Income Card */}
        <Card 
          title={t.total_income} 
          value={summary?.total_income?.toFixed(2) || "0.00"} 
          color="primary" 
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          }
        />
        {/* Expenses Card */}
        <Card 
          title={t.total_expense} 
          value={summary?.total_expense?.toFixed(2) || "0.00"} 
          color="tertiary" 
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          }
        />
      </div>
    </div>
  );
};

export default SummaryCards;
