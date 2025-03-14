"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import Switch from "@/components/ui/theme-switcher";
import { getUser } from "@/services/auth";
import { getSummary } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Papa from "papaparse";
import { Download } from "lucide-react"; // Tambahkan icon download

export default function ReportsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [trendData, setTrendData] = useState<{ month: string; total_income: number; total_expense: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        
        const summaryData = await getSummary();
        setSummary(summaryData);
        setTrendData(summaryData.trend || []);
      } catch (err: any) {
        console.error("❌ Error fetching user data:", err.message || err);
        setError("Failed to fetch data. Redirecting to login...");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);
  
  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      Cookies.remove("token");
      setUser(undefined);
      router.push("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
      setError("Logout failed. Please try again.");
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

  if (loading) {
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
              <h1 className="text-2xl font-semibold title-name">Reports</h1>
              <Switch />
            </div>
            
            {/* Financial Summary */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6 title-name">Financial Summary</h2>

              {/* Export CSV Button */}
              <button 
                onClick={handleExportCSV} 
                className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary text-[var(--text-foreground)] rounded-lg hover:bg-primary/90 transition cursor-pointer"
              >
                <Download size={18} /> Export CSV
              </button>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-[var(--border-color)] bg-[var(--primary)] rounded-lg">
                  <h2 className="text-lg font-medium text-[var(--text-black)]">Total Income</h2>
                  <p className="text-2xl font-bold text-[var(--text-black)]">
                    Rp {summary.total_income.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="p-4 border border-[var(--border-color)] bg-[var(--tertiary)] rounded-lg">
                  <h2 className="text-lg font-medium text-[var(--text-black)]">Total Expense</h2>
                  <p className="text-2xl font-bold text-[var(--text-black)]">
                    Rp {summary.total_expense.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="p-4 border border-[var(--border-color)] bg-[var(--secondary)] rounded-lg">
                  <h2 className="text-lg font-medium text-[var(--text-black)]">Final Balance</h2>
                  <p className="text-2xl font-bold text-[var(--text-black)]">
                    Rp {summary.balance.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Trend Chart */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 title-name">Financial Trend</h2>
              <div className="w-full h-80 bg-card p-4 rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="total_income" stroke="#2ECC71" strokeWidth={2} name="Income" />
                    <Line type="monotone" dataKey="total_expense" stroke="#FF6B6B" strokeWidth={2} name="Expense" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
