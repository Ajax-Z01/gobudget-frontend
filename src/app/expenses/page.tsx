"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getUser } from "@/services/auth";
import { getTransactions } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Switch from "@/components/ui/theme-switcher";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  note: string;
  category_id: number;
  Category?: {
    id: number;
    name: string;
  };
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

const ExpensesPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [userData, transactionsData] = await Promise.all([
          getUser(),
          getTransactions(),
        ]);

        if (isMounted) {
          setUser(userData);

          // Filter hanya transaksi dengan type: "Expense"
          const filteredExpenses: Transaction[] = transactionsData
            .filter((transaction: Transaction) => transaction.type === "Expense")
            .slice(-5)
            .reverse();

          setExpenses(filteredExpenses);
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
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Sidebar for desktop */}
      <Sidebar user={user} handleLogout={handleLogout} />

      {/* Mobile menu */}
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Expenses</h1>
              {/* Theme switcher */}
              <Switch />
            </div>

            {/* Expenses List */}
            <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold">Recent Expenses</h2>
              <ul className="mt-2">
                {expenses.length > 0 ? (
                  expenses.map((transaction: Transaction, index: number) => (
                    <li key={index} className="border-b border-gray-200 dark:border-gray-700 py-2">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{transaction.note}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            ({transaction.Category?.name || "Unknown"})
                          </span>
                        </div>
                        <span className="text-red-500">
                          -{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.amount)}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center mt-4">No expenses recorded.</p>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExpensesPage;
