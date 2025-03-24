import { Progress } from "@/components/ui/progress";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";

interface ProgressBarProps {
  totalSpent: number;
  budgetAmount: number;
  currency: string;
}

const ProgressBar = ({ totalSpent, budgetAmount, currency}: ProgressBarProps) => {
  const { language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];
  const progress = Math.min((totalSpent / budgetAmount) * 100, 100);

  return (
    <div className="w-full">
      <p className="text-sm mb-1">
        {t.used}: {new Intl.NumberFormat("id-ID", { style: "currency", currency }).format(totalSpent)} / {new Intl.NumberFormat("id-ID", { style: "currency", currency }).format(budgetAmount)}
      </p>
      <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};

export default ProgressBar;
