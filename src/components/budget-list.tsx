import { useState } from "react";
import { updateBudget, deleteBudget } from "@/services/budgets";
import { Budget } from "@/types/type";
import ProgressBar from "@/components/progress-bar";

interface BudgetListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
}

export default function BudgetList({ budgets, setBudgets }: BudgetListProps) {
  const [editBudget, setEditBudget] = useState<Budget | null>(null);
  const [newAmount, setNewAmount] = useState("");

  const handleEdit = (budget: Budget) => {
    setEditBudget(budget);
    setNewAmount(budget.amount.toString());
  };

  const handleUpdate = async () => {
    if (!editBudget) return;

    try {
      const updatedBudget = await updateBudget(editBudget.id, { amount: parseFloat(newAmount) });

      setBudgets(budgets.map((b) => (b.id === editBudget.id ? updatedBudget : b)));

      setEditBudget(null);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBudget(id);
      setBudgets(budgets.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Budgets</h2>
      {budgets.map((budget) => (
        <div key={budget.id} className="p-3 border rounded-lg">
          <p>Category: {budget.category?.name || "Unknown"}</p>
          <ProgressBar totalSpent={budget.spent} budgetAmount={budget.amount} />

          <div className="flex gap-2 mt-2">
            {editBudget?.id === budget.id ? (
              <>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="border p-1"
                />
                <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">
                  Save
                </button>
              </>
            ) : (
              <button onClick={() => handleEdit(budget)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
              </button>
            )}

            <button onClick={() => handleDelete(budget.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
