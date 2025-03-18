import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BarChart2, Wallet, Settings } from "lucide-react";

const features = [
  {
    icon: <Wallet size={40} className="text-blue-500 dark:text-blue-400" />, 
    title: "Expense Tracking",
    description: "Easily track your daily expenses and categorize your spending to manage your finances effectively."
  },
  {
    icon: <BarChart2 size={40} className="text-green-500 dark:text-green-400" />, 
    title: "Budget Management",
    description: "Set monthly budgets and monitor your progress with intuitive charts and analytics."
  },
  {
    icon: <CheckCircle size={40} className="text-purple-500 dark:text-purple-400" />, 
    title: "Financial Reports",
    description: "Generate insightful reports on your spending trends and export data for further analysis."
  },
  {
    icon: <Settings size={40} className="text-yellow-500 dark:text-yellow-400" />, 
    title: "Customizable Settings",
    description: "Personalize your experience with multiple currency options, themes, and security settings."
  }
];

const FeaturesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-12 sm:py-20">
        <h1 className="text-4xl font-bold title-name">Features</h1>
        <p className="mt-2 text-lg text-[var(--foreground)]">
          Discover how GoBudget helps you manage your finances smarter.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeaturesPage;
