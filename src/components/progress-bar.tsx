import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  totalSpent: number;
  budgetAmount: number;
}

const ProgressBar = ({ totalSpent, budgetAmount }: ProgressBarProps) => {
  const progress = Math.min((totalSpent / budgetAmount) * 100, 100);

  return (
    <div className="w-full">
      <p className="text-sm mb-1">
        Used: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalSpent)} / {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(budgetAmount)}
      </p>
      <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};

export default ProgressBar;
