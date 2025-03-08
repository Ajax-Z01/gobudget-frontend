"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getUser } from "@/services/auth";
import { getCategories } from "@/services/categories";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSummary } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Switch from "@/components/ui/ThemeSwitcher";
import EditTransactionModal from "@/components/ui/EditTransactionModal";
import AddTransactionModal from "@/components/ui/AddTransactionModal";

export default function DashboardPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

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
          setTransactions(transactionsData);
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
  
  const fetchSummary = async () => {
    try {
      const summaryData = await getSummary();
      setSummary(summaryData);
    } catch (err: any) {
      console.error("❌ Failed to fetch summary:", err.message || err);
    }
  };  

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

  const handleCreateTransaction = async (newTransaction: any) => {
    if (!newTransaction.note || Number(newTransaction.amount) <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }

    try {
      const addedTransaction = await createTransaction({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount.toString()),
        category_id: Number(newTransaction.category_id), // Konversi ke number
      });

      setTransactions([...transactions, addedTransaction]);
      setShowAddModal(false);
      
      await fetchSummary();
    } catch (err) {
      console.error("❌ Failed to add transaction:", err);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const handleEditClick = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const handleSaveTransaction = async (updatedTransaction: any) => {
    console.log("Updating Transaction:", updatedTransaction);

    try {
      const sanitizedTransaction = {
        ...updatedTransaction,
        category_id: Number(updatedTransaction.category_id), // Konversi ke number
      };

      await updateTransaction(sanitizedTransaction.id, sanitizedTransaction);
      setTransactions(transactions.map(tx => (tx.id === sanitizedTransaction.id ? sanitizedTransaction : tx)));
      setSelectedTransaction(null);
      
      await fetchSummary();
    } catch (err) {
      console.error("❌ Failed to update transaction:", err);
      alert("Failed to update transaction. Please try again.");
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(tx => tx.id !== id));
      await fetchSummary();
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className={`min-h-screen p-6 transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {user?.email || "Guest"}!</h1>
          <Switch />
        </div>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mb-6 transition">
          Logout
        </button>
        
        <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p>Total Income: <span className="text-green-600 font-bold">${summary?.total_income?.toFixed(2) || "0.00"}</span></p>
          <p>Total Expense: <span className="text-red-600 font-bold">${summary?.total_expense?.toFixed(2) || "0.00"}</span></p>
          <p>Balance: <span className="font-bold">${summary?.balance?.toFixed(2) || "0.00"}</span></p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            + Add Transaction
          </button>
        </div>

        <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} p-4 rounded-lg shadow-md transition`}>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No transactions found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map(tx => (
                <li key={tx.id} className="flex justify-between items-center py-3">
                  <div>
                    <p className="font-medium">{tx.note}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tx.amount} ({tx.type})</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Category: {tx.Category?.name || "Uncategorized"}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(tx)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTransaction(tx.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddTransactionModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateTransaction}
        />
      )}

      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          categories={categories}
          onClose={() => setSelectedTransaction(null)}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
}
