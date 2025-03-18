import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PiggyBank } from "lucide-react";

export default function FeaturePreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 flex flex-col items-center text-center">
          <CardHeader>{feature.icon}</CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold title-name">{feature.title}</CardTitle>
            <p className="mt-2 text-[var(--foreground)]">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const features = [
  {
    title: "Expense Tracking",
    description: "Easily log and categorize your expenses to understand your spending habits.",
    icon: <PiggyBank size={48} className="text-[var(--secondary)]" />,
  },
  {
    title: "Budgeting Tools",
    description: "Create personalized budgets and get alerts when you're approaching your limits.",
    icon: <BarChart size={48} className="text-[var(--secondary)]" />,
  },
  {
    title: "Financial Insights",
    description: "Get visual reports and analysis to help you make better financial decisions.",
    icon: <LineChart size={48} className="text-[var(--secondary)]" />,
  },
];