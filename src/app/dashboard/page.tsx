"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getUser } from "@/services/auth";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Switch from "@/components/ui/ThemeSwitcher";
import EditTransactionModal from "@/components/ui/EditTransactionModal";
import AddTransactionModal from "@/components/ui/AddTransactionModal";

export default function DashboardPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

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
    if (!newTransaction.note || newTransaction.amount <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }

    try {
      const addedTransaction = await createTransaction({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount.toString()),
      });

      setTransactions([...transactions, addedTransaction]);
      setShowAddModal(false);
    } catch (err) {
      console.error("❌ Failed to add transaction:", err);
    }
  };

  const handleEditClick = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const handleSaveTransaction = async (updatedTransaction: any) => {
    try {
      await updateTransaction(updatedTransaction.id, updatedTransaction);
      setTransactions(transactions.map(tx => (tx.id === updatedTransaction.id ? updatedTransaction : tx)));
      setSelectedTransaction(null);
    } catch (err) {
      console.error("❌ Failed to update transaction:", err);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(tx => tx.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err);
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
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateTransaction}
        />
      )}

      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
}
