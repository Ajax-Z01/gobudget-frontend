"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getUser } from "@/services/auth";
import { getCategories } from "@/services/categories";
import { getTransactions, getSummary } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";
import Switch from "@/components/ui/theme-switcher";
import SummaryCards from "@/components/summary-cards";
import RecentActivity from "@/components/recent-activity";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";

const DashboardPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [categories, setCategories] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [userData, transactionsData, categoriesData, summaryData] = await Promise.all([
          getUser(),
          getTransactions(),
          getCategories(),
          getSummary(),
        ]);

        if (isMounted) {
          setUser(userData);
          setTransactions(transactionsData.slice(-5).reverse());
          setCategories(categoriesData);
          setSummary(summaryData);
        }
      } catch (err: any) {
        console.error("❌ Error fetching data:", err.message || err);
        setError(`Failed to fetch data: ${err.message || "Unknown error"}`);
        router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      Cookies.remove("token");
      router.replace("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Sidebar for desktop */}
      <Sidebar user={user} handleLogout={handleLogout} />

      {/* Mobile menu */}
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold title-name">{t.dashboard}</h1>
              {/* Theme switcher */}
              <Switch />
            </div>

            {/* Dashboard content */}
            <SummaryCards summary={summary} />

            {/* Recent activity section */}
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
