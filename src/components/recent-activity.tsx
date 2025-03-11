import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactions";

const RecentActivity = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

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

  return (
    <div className="mt-8">
              <h2 className="text-lg font-medium title-name">Recent Activity</h2>
      <div className="mt-4 card shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-[var(--border-color)]">
          {transactions.map((transaction, index) => (
            <li key={index}>
              <a href="#" className="block hover:bg-[var(--border-color)] dark:hover:bg-[var(--border-color)] transition-all">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium card-title truncate">
                      Transaction #{index + 1} | {transaction.Category?.name || "Uncategorized"}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--primary)] text-black">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="sm:flex">
                      <div className="flex items-center text-sm text-[var(--foreground)]">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-[var(--foreground)]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd" />
                        </svg>
                        <span>
                          {new Date(transaction.updated_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 flex items-center text-sm text-[var(--foreground)]">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-[var(--foreground)]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd" />
                      </svg>
                      <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.amount)}</span>
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
