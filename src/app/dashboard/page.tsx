"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth";
import { getTransactions } from "@/services/transactions";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    getUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });

    getTransactions(token)
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.email || "Guest"}!
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Logout
      </button>

      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <ul className="w-full max-w-2xl bg-gray-100 p-4 rounded-lg shadow-md">
        {transactions.length === 0 ? (
          <p className="text-black text-center py-2">No transactions found</p>
        ) : (
          transactions.map((tx, index) => (
            <li
              key={tx.id}
              className={`py-3 px-4 flex justify-between items-center border-b ${
                index === transactions.length - 1 ? "border-none" : "border-gray-300"
              }`}
            >
              <span className="text-black">{tx.note}</span>
              <span
                className={`font-semibold ${
                  tx.type === "Income" ? "text-green-600" : "text-red-600"
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
