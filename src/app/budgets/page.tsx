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
import { getCategories } from "@/services/categories";
import { Budget, NewBudget, Category } from "@/types/type";
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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const userData = await getUser();
        if (isMounted) setUser(userData);

        const fetchedBudgets = await getBudgets();
        if (isMounted) setBudgets(fetchedBudgets);
        
        const fetchedCategories = await getCategories();
        if (isMounted) setCategories(fetchedCategories);
      } catch (err: any) {
        console.error("❌ Error fetching data:", err.message || err);
        if (isMounted) {
          setError("Failed to fetch data. Redirecting to login...");
          setTimeout(() => router.replace("/login"), 2000);
        }
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      {/* Sidebar untuk Desktop */}
      <Sidebar user={user} handleLogout={handleLogout} />

      {/* Mobile Menu */}
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-1 flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-semibold title-name">Budgets</h1>
            <Switch />
          </div>

          {/* Form Input Budget */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-2 p-2">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value) || "")}
              className="w-full sm:w-auto px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || "")}
              className="w-full sm:w-auto"
            />

            <Button onClick={handleCreateBudget} className="w-full sm:w-auto">
              Add Budget
            </Button>
          </div>

          {/* Budget List */}
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <BudgetList budgets={budgets} setBudgets={setBudgets} />
          )}
        </main>
      </div>
    </div>
  );
}
