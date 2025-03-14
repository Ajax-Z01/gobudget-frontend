import { useState } from "react";
import { updateBudget, deleteBudget } from "@/services/budgets";
import { Budget } from "@/types/type";
import ProgressBar from "@/components/progress-bar";
import Button from "@/components/ui/button";

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

  const handleCancelEdit = () => {
    setEditBudget(null);
    setNewAmount("");
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
    <div className="p-2">
      <h2 className="text-xl font-semibold mb-4 title-name">Budgets List</h2>
      {budgets.map((budget) => (
        <div key={budget.id} className="p-3 border-2 border-[var(--border-color)] rounded-lg mb-4">
          <p className="text-sm font-medium">Category: {budget.category?.name || "Unknown"}</p>
          <ProgressBar totalSpent={budget.spent} budgetAmount={budget.amount} />

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            {editBudget?.id === budget.id ? (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="border p-2 rounded w-full sm:w-32"
                />
                <Button onClick={handleUpdate} variant="primary" className="w-full sm:w-auto">
                  Save
                </Button>
                <Button onClick={handleCancelEdit} variant="secondary" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleEdit(budget)} variant="secondary" className="w-full sm:w-auto">
                Edit
              </Button>
            )}

            <Button onClick={() => handleDelete(budget.id)} variant="danger" className="w-full sm:w-auto">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
