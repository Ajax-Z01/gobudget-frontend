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
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
      <div className="mt-4 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((transaction, index) => (
            <li key={index}>
              <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                      Transaction #{index + 1} | Category: {transaction.Category?.name || "Uncategorized"}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="sm:flex">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500"
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
                    <div className="ml-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd" />
                      </svg>
                      <span>${transaction.amount}</span>
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
