"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getUser } from "@/services/auth";
import { getTransactions } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Switch from "@/components/ui/ThemeSwitcher";

export default function DashboardPage() {
  const router = useRouter();
  const { theme } = useTheme(); // 🔥 Ambil tema yang sedang aktif
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const userData = await getUser();
        const transactionsData = await getTransactions();

        if (isMounted) {
          setUser(userData);
          setTransactions(transactionsData);
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

  const handleLogout = () => {
    try {
      console.log("🔹 Logging out, removing token...");
      Cookies.remove("token");
      router.push("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      data-theme={theme} // 🔥 Tambahkan data-theme
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <Switch />
      </div>

      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email || "Guest"}!</h1>

      <button
        onClick={handleLogout}
        className="mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
      >
        Logout
      </button>

      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      <ul
        className={`w-full max-w-2xl p-4 rounded-lg shadow-md ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {transactions.length === 0 ? (
          <p className="text-center py-2">No transactions found</p>
        ) : (
          transactions.map((tx, index) => (
            <li
              key={tx.id}
              className={`py-3 px-4 flex justify-between items-center border-b ${
                index === transactions.length - 1
                  ? "border-none"
                  : theme === "dark"
                  ? "border-gray-700"
                  : "border-gray-300"
              }`}
            >
              <span>{tx.note}</span>
              <span
                className={`font-semibold ${
                  tx.type === "Income"
                    ? theme === "dark"
                      ? "text-green-400"
                      : "text-green-600"
                    : theme === "dark"
                    ? "text-red-400"
                    : "text-red-600"
                }`}
              >
                {tx.type === "Income" ? "+" : "-"}Rp{tx.amount}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
