import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactions";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  updated_at: string;
  Category?: {
    name: string;
  };
}

const RecentExpense = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsData: Transaction[] = await getTransactions();
        
        const filteredTransactions = transactionsData
          .filter((transaction) => transaction.type === "Expense")
          .reverse();
          
        setTransactions(filteredTransactions);
        
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium title-name">Table Expense</h2>
      <div className="table-container mt-4 overflow-hidden rounded-lg">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>
                  {transaction.Category?.name || "Uncategorized"}
                </td>
                <td>
                  {new Date(transaction.updated_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })}
                </td>
                <td className="text-[var(--tertiary)] font-semibold">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentExpense;
