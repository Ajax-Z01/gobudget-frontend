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
import { translations } from "@/utils/translations";
import { useSettings } from "@/app/context/SettingContext";
import { getTranslatedCategory } from "@/utils/categoryTranslations";

const TransactionsPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

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
        setError(`${t.error_fetching_user}`);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const fetchData = async () => {
    try {
      const [transactionsData, categoriesData] = await Promise.all([
        getTransactions(),
        getCategories(),
      ]);
      
      const translatedTransactions = transactionsData.map((tx: Transaction) => ({
        ...tx,
        category: {
          ...tx.category,
          name: getTranslatedCategory(tx.category?.name || "Unknown", language),
        },
      }));

      const translatedCategories = categoriesData.map((cat: Category) => ({
        ...cat,
        name: getTranslatedCategory(cat.name, language),
      }));

      setTransactions(translatedTransactions);
      setCategories(translatedCategories);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError(`${t.error_loading_data}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

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
      setError(`${t.logout_failed}`);
    }
  };

  const handleCreateTransaction = async (newTransaction: any) => {
    if (!newTransaction.note || Number(newTransaction.amount) <= 0) {
      alert(`${t.enter_valid_transaction}`);
      return;
    }

    try {
      const addedTransaction = {
        ...await createTransaction({
          ...newTransaction,
          amount: parseFloat(newTransaction.amount.toString()),
          category_id: Number(newTransaction.category_id),
        }),
        category: {
          ...newTransaction.category,
          name: getTranslatedCategory(newTransaction.category?.name || "Unknown", language),
        },
      };

      setTransactions([...transactions, addedTransaction]);
      setShowAddModal(false);
    } catch (err) {
      console.error("❌ Failed to add transaction:", err);
      alert(`${t.failed_to_add_transaction}`);
    }
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };
  
  const handleSaveTransaction = async (updatedTransaction: any) => {
    console.log(`${t.updating_transaction}:`, updatedTransaction);

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
      alert(`${t.failed_to_update_transaction}`);
    }
  };
  
  const handleDeleteTransaction = async (id: number) => {
    if (!confirm(`${t.confirm_delete_transaction}`)) return;

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err);
      alert(`${t.failed_to_delete_transaction}`);
    }
  };
  
  const refreshData = async () => {
    await fetchData();
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar user={user} handleLogout={handleLogout} />
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold title-name">{t.transactions}</h1>
              <Switch />
            </div>

            <div className="mt-8 p-2">
              <Button onClick={() => setShowAddModal(true)}>{t.add_expense}</Button>
            </div>

            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <TransactionList
                transactions={transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            )}
          </div>
        </main>
      </div>

      {showAddModal && <AddTransactionModal categories={categories} onClose={() => setShowAddModal(false)} onSave={handleCreateTransaction} refreshData={refreshData} />}
      {selectedTransaction && <EditTransactionModal transaction={selectedTransaction} categories={categories} onClose={() => setSelectedTransaction(null)} onSave={handleSaveTransaction} refreshData={refreshData} />}
    </div>
  );
};

export default TransactionsPage;