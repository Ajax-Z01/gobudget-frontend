"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import Switch from "@/components/ui/theme-switcher";
import BudgetList from "@/components/budget-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser, logout } from "@/services/auth";
import { getBudgets, createBudget } from "@/services/budgets";
import { getCategories } from "@/services/categories";
import { getExchangeRates } from "@/services/exchangeRates";
import { useSettings } from "@/app/context/SettingContext";
import { getTranslatedCategory } from "@/utils/categoryTranslations";
import { translations } from "@/utils/translations";
import { Budget, NewBudget, Category } from "@/types/type";

export default function BudgetsPage() {
  const router = useRouter();
  const { language, currency: defaultCurrency } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  const [user, setUser] = useState<{ email: string; name: string } | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [currency, setCurrency] = useState<string>(defaultCurrency);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const userData = await getUser();
        const fetchedBudgets = await getBudgets();
        const fetchedCategories = await getCategories();

        if (isMounted) {
          setUser(userData);
          setBudgets(fetchedBudgets);
          setCategories(fetchedCategories);
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        if (isMounted) {
          setError(t.fetch_error);
          setTimeout(() => router.replace("/login"), 2000);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [router, t]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  const handleCreateBudget = async () => {
    if (!categoryId || !amount || !currency) return;
    
    try {
      const rates = await getExchangeRates(currency);
      const exchangeRate = rates["IDR"];
      const newBudget: NewBudget = { category_id: categoryId, amount, currency, exchange_rate: exchangeRate };
      await createBudget(newBudget);

      const updatedBudgets = await getBudgets();
      setBudgets(updatedBudgets);

      setCategoryId("");
      setAmount("");
      
      console.log("Created budget:", newBudget);
    } catch (error) {
      console.error("❌ Error creating budget:", error);
      setError(t.create_budget_error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Sidebar user={user} handleLogout={handleLogout} />
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-1 flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-semibold title-name">{t.budgets}</h1>
            <Switch />
          </div>

          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-2 p-2">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value) || "")}
              className="w-full sm:w-auto px-4 py-2 border rounded-md text-[var(--card-text)] bg-[var(--background)]"
            >
              <option value="">{t.select_category}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getTranslatedCategory(category.name || t.uncategorized, language)}
                </option>
              ))}
            </select>

            <Input
              type="number"
              placeholder={t.amount}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || "")}
              className="w-full sm:w-auto"
            />

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border rounded-md text-[var(--card-text)] bg-[var(--background)]"
            >
              {["IDR", "USD", "EUR", "JPY"].map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>

            <Button onClick={handleCreateBudget} className="w-full sm:w-auto">
              {t.add_budget}
            </Button>
          </div>

          {error ? <p className="text-red-500 text-center">{error}</p> : <BudgetList budgets={budgets} setBudgets={setBudgets} />}
        </main>
      </div>
    </div>
  );
}