"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import Switch from "@/components/ui/theme-switcher";
import BudgetList from "@/components/budget-list";
import { getUser } from "@/services/auth";
import { getBudgets, createBudget } from "@/services/budgets";
import { Budget, NewBudget } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BudgetsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
  
        const fetchedBudgets = await getBudgets();
        setBudgets(fetchedBudgets);
      } catch (err: any) {
        console.error("❌ Error fetching data:", err.message || err);
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
      router.replace("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  const handleCreateBudget = async () => {
    if (!categoryId || !amount) return;
  
    try {
      const newBudget: NewBudget = {
        category_id: categoryId,
        amount,
      };
  
      await createBudget(newBudget);
  
      // Panggil ulang `getBudgets()` agar data `spent` terbaru diperoleh
      const updatedBudgets = await getBudgets();
      setBudgets(updatedBudgets);
  
      setCategoryId("");
      setAmount("");
    } catch (error) {
      console.error("❌ Error creating budget:", error);
      setError("Failed to create budget.");
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
              <h1 className="text-2xl font-semibold title-name">Budgets</h1>
              {/* Theme switcher */}
              <Switch />
            </div>

            {/* Form Input Budget */}
            <div className="pt-8 mb-4 flex gap-2">
              <Input
                type="number"
                placeholder="Category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value) || "")}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || "")}
              />
              <Button onClick={handleCreateBudget}>Add Budget</Button>
            </div>

            {/* Budget List */}
            <BudgetList budgets={budgets} setBudgets={setBudgets} />
          </div>
        </main>
      </div>
    </div>
  );
}
