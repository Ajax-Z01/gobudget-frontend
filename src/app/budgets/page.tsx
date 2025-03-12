"use client";

import { useEffect, useState } from "react";
import { getBudgets, createBudget } from "@/services/budgets";
import { Budget, NewBudget } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleCreateBudget = async () => {
    if (!categoryId || !amount) return;
  
    try {
      const newBudget: NewBudget = { 
        category_id: categoryId, 
        amount 
      };
  
      await createBudget(newBudget);
      setCategoryId("");
      setAmount("");
      fetchBudgets();
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };  

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Budgets</h1>
      <div className="mb-4 flex gap-2">
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
      <ul className="space-y-2">
        {budgets.map((budget) => (
          <li key={budget.id} className="border p-3 rounded-lg">
            Category: {budget.category_id} | Amount: ${budget.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
