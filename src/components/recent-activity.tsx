import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactions";
import { Transaction } from "@/types/type";

const RecentActivity = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsData = await getTransactions();
        setTransactions(transactionsData.slice(-5).reverse());
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium title-name">Recent Activity</h2>
      <div className="mt-4 card shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-[var(--border-color)]">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <a
                href="#"
                className="block hover:bg-[var(--border-color)] dark:hover:bg-[var(--border-color)] transition-all"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium card-title truncate">
                      Transaction | {transaction.category?.name || "Uncategorized"}
                    </div>
                    <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-[var(--primary)] text-black">
                      Completed
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm text-[var(--foreground)]">
                    <div className="flex items-center">
                      <svg
                        className="mr-1.5 h-5 w-5 text-[var(--foreground)]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{formatDate(transaction.created_at)}</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="mr-1.5 h-5 w-5 text-[var(--foreground)]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR"
                        }).format(transaction.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
