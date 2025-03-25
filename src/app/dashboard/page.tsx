"use client";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import SummaryCards from "@/components/summary-cards";
import Switch from "@/components/ui/theme-switcher";
import RecentActivity from "@/components/recent-activity";
import { getUser, logout } from "@/services/auth";
import { getSummary } from "@/services/transactions";
import { useRouter } from "next/navigation";
import { getExchangeRates } from "@/services/exchangeRates";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";

export default function DashboardPage() {
  const router = useRouter();
  const { language, currency } = useSettings();
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const t = translations[language === "English" ? "en" : "id"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const userData = await getUser();
        setUser(userData);

        const summaryData = await getSummary();
        setSummary(summaryData);

        if (currency !== "IDR") {
          const rates = await getExchangeRates("IDR");
          setExchangeRates(rates);
        } else {
          setExchangeRates({ IDR: 1 });
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to fetch data. Redirecting to login...");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, currency]);
  
  const convertedSummary = useMemo(() => {
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) return summary;
    
    return {
      total_income: summary.total_income * (exchangeRates[currency] || 1),
      total_expense: summary.total_expense * (exchangeRates[currency] || 1),
      balance: summary.balance * (exchangeRates[currency] || 1),
    };
  }, [summary, exchangeRates, currency]);

  if (isLoading || Object.keys(exchangeRates).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return <div className="text-center mt-10 text-error">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar user={user} handleLogout={logout} />
      <MobileMenu user={user} handleLogout={logout} />

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold title-name">{t.dashboard}</h1>
              <Switch />
            </div>

            {/* Summary Cards */}
            <SummaryCards summary={convertedSummary} />
            
            {/* Recent activity section */}
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}
