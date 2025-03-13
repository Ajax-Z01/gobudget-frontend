"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Switch from "@/components/ui/theme-switcher";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import TransactionList from "@/components/transactions-list";
import { getUser } from "@/services/auth";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "@/services/transactions";
import { getCategories } from "@/services/categories";
import { Button } from "@/components/ui/button";
import { Transaction, Category } from "@/types/type";
import AddTransactionModal from "@/components/modal/add-transaction-modal";
import EditTransactionModal from "@/components/modal/edit-transaction-modal";

const TransactionsPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err: any) {
        console.error("❌ Error fetching user:", err.message || err);
        setError("Failed to fetch user. Redirecting to login...");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData, categoriesData] = await Promise.all([
          getTransactions(),
          getCategories(),
        ]);
        setTransactions(transactionsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to load data.");
      }
    };

    fetchData();
  }, []);

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
      router.replace("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
      setError("Logout failed. Please try again.");
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
        category_id: Number(newTransaction.category_id),
      });

      setTransactions([...transactions, addedTransaction]);
      setShowAddModal(false);
    } catch (err) {
      console.error("❌ Failed to add transaction:", err);
      alert("Failed to add transaction. Please try again.");
    }
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };
  
  const handleSaveTransaction = async (updatedTransaction: any) => {
    console.log("Updating Transaction:", updatedTransaction);

    try {
      const sanitizedTransaction = {
        ...updatedTransaction,
        category_id: Number(updatedTransaction.category_id),
      };

      await updateTransaction(sanitizedTransaction.id, sanitizedTransaction);
      setTransactions(transactions.map(tx => (tx.id === sanitizedTransaction.id ? sanitizedTransaction : tx)));
      setSelectedTransaction(null);
      
    } catch (err) {
      console.error("❌ Failed to update transaction:", err);
      alert("Failed to update transaction. Please try again.");
    }
  };
  
  const handleDeleteTransaction = async (id: number) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err);
      alert("Failed to delete transaction.");
    }
  };
  
  const refreshData = async () => {
    try {
      const transactionsData = await getTransactions();
      setTransactions(transactionsData);
    } catch (err) {
      console.error("❌ Error refreshing transactions:", err);
      setError("Failed to refresh transactions.");
    }
  };

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
              <h1 className="text-2xl font-semibold title-name">Transactions</h1>
              {/* Theme switcher */}
              <Switch />
            </div>

            {/* Add Transaction Button */}
            <div className="my-4">
              <Button onClick={() => setShowAddModal(true)}>Add Transaction</Button>
            </div>

            {/* Transaction List Section */}
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <TransactionList
                transactions={transactions}
                setTransactions={setTransactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            )}
          </div>
        </main>
      </div>

      {showAddModal && (
        <AddTransactionModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateTransaction}
          refreshData={refreshData}
        />
      )}
      
      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          categories={categories}
          onClose={() => setSelectedTransaction(null)}
          onSave={handleSaveTransaction}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
