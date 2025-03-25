"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import Switch from "@/components/ui/theme-switcher";
import { getUser, logout } from "@/services/auth";
import { getSummary } from "@/services/transactions";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Papa from "papaparse";
import { Download } from "lucide-react";
import { useSettings } from "@/app/context/SettingContext";
import { getExchangeRates } from "@/services/exchangeRates";
import { translations } from "@/utils/translations"

export default function ReportsPage() {
  const router = useRouter();
  const { language,currency } = useSettings();
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [trendData, setTrendData] = useState<{ month: string; total_income: number; total_expense: number }[]>([]);
  const [exchangeRate, setExchangeRate] = useState(1);
  const t = translations[language === "English" ? "en" : "id"];
  const localeMap: Record<string, string> = {
    English: "en-US",
    Bahasa: "id-ID",
  };
  const currentLocale = localeMap[language] || "en-US";
  
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      if (currency === "IDR") {
        setExchangeRate(1);
        setIsLoading(false);
        return;
      }
  
      try {
        const rates = await getExchangeRates("IDR");
        if (rates && rates[currency]) {
          setExchangeRate(rates[currency]);
        } else {
          setExchangeRate(1);
        }
      } catch (err) {
        console.error("❌ Error fetching exchange rates:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExchangeRates();
  }, [currency]);  

  useEffect(() => {
    if (isLoading) return;
    
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);

        const summaryData = await getSummary();
        setSummary({
          total_income: summaryData.total_income * exchangeRate,
          total_expense: summaryData.total_expense * exchangeRate,
          balance: summaryData.balance * exchangeRate,
        });

        let accumulatedBalance = 0;
        const convertedTrend = summaryData.trend.map((item) => {
          accumulatedBalance += (item.total_income - item.total_expense) * exchangeRate;
          return {
            month: item.month,
            total_income: item.total_income * exchangeRate,
            total_expense: item.total_expense * exchangeRate,
            balance: accumulatedBalance,
          };
        });

        setTrendData(convertedTrend);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to fetch data. Redirecting to login...");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, exchangeRate, isLoading]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLocale, { style: "currency", currency }).format(amount);
  };
  
  const formatMonth = (dateString: string) => {
    const date = new Date(dateString + "-01");
    return date.toLocaleString(currentLocale, { month: "short", year: "numeric" });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  const handleExportCSV = () => {
    const csvData = [
      ["Month", "Total Income", "Total Expense"],
      ...trendData.map(({ month, total_income, total_expense }) => [month, total_income, total_expense]),
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "financial_summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
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
      <Sidebar user={user} handleLogout={handleLogout} />
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold title-name">{t.reports}</h1>
              <Switch />
            </div>

            {/* Financial Summary */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6 title-name">{t.financial_summary}</h2>

              {/* Export CSV Button */}
              <button 
                onClick={handleExportCSV} 
                className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary text-[var(--text-foreground)] rounded-lg hover:bg-primary/90 transition cursor-pointer"
              >
                <Download size={18} /> {t.export_csv}
              </button>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-[var(--border-color)] bg-[var(--secondary)] rounded-lg">
                  <h2 className="text-lg font-medium text-[var(--text-black)]">{t.final_balance}</h2>
                  <p className="text-2xl font-bold text-[var(--text-black)]">
                    {formatCurrency(summary.balance)}
                  </p>
                </div>
                
                <div className="p-4 border border-[var(--border-color)] bg-[var(--primary)] rounded-lg">
                  <h2 className="text-lg font-medium text-[var(--text-black)]">{t.total_income}</h2>
                  <p className="text-2xl font-bold text-[var(--text-black)]">
                    {formatCurrency(summary.total_income)}
                  </p>
                </div>

                <div className="p-4 border border-[var(--border-color)] bg-[var(--tertiary)] rounded-lg">
                  <h2 className="text-lg font-medium text-[var(--text-black)]">{t.total_expense}</h2>
                  <p className="text-2xl font-bold text-[var(--text-black)]">
                    {formatCurrency(summary.total_expense)}
                  </p>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 title-name">{t.financial_trend}</h2>
              <div className="w-full h-80 bg-[var(--card-bg)] border-2 border-[var(--border-color)] p-4 rounded-lg">
                {trendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <XAxis dataKey="month" stroke="var(--foreground)" tickFormatter={formatMonth} />
                      <YAxis 
                        stroke="var(--foreground)" 
                        tickFormatter={(value) => new Intl.NumberFormat(currentLocale, { notation: "compact" }).format(value)}
                      />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label: string) => formatMonth(label)}
                        contentStyle={{ backgroundColor: "var(--card-bg)", borderRadius: "8px", border: "1px solid var(--primary)" }} 
                        wrapperStyle={{ borderRadius: "8px" }} 
                        labelStyle={{ color: "var(--primary)", fontWeight: "bold" }} 
                      />
                      <CartesianGrid stroke="var(--secondary)" strokeDasharray="3 3" />
                      <Line 
                        type="monotone" 
                        dataKey="total_income" 
                        stroke="var(--primary)" 
                        strokeWidth={2} 
                        name="Income" 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="total_expense" 
                        stroke="var(--tertiary)" 
                        strokeWidth={2} 
                        name="Expense" 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="var(--secondary)"
                        strokeWidth={2} 
                        name="Balance" 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-400">No Data Available</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
