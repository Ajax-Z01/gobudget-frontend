"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getUser } from "@/services/auth";
import { getCategories } from "@/services/categories";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSummary } from "@/services/transactions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import Switch from "@/components/ui/theme-switcher";
import EditTransactionModal from "@/components/modal/edit-transactionmodal";
import AddTransactionModal from "@/components/modal/add-transaction-modal";
import RecentActivity from "@/components/recent-activity";

const DashboardPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<{ email: string, name: string } | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [userData, transactionsData, categoriesData, summaryData] = await Promise.all([
          getUser(),
          getTransactions(),
          getCategories(),
          getSummary(),
        ]);

        if (isMounted) {
          setUser(userData);
          setTransactions(transactionsData.slice(-5).reverse());
          setCategories(categoriesData);
          setSummary(summaryData);
        }
      } catch (err: any) {
        console.error("❌ Error fetching data:", err.message || err);
        setError(`Failed to fetch data: ${err.message || "Unknown error"}`);
        router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [router]);
  
  const fetchSummary = async () => {
    try {
      const summaryData = await getSummary();
      setSummary(summaryData);
    } catch (err: any) {
      console.error("❌ Failed to fetch summary:", err.message || err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      Cookies.remove("token");
      router.replace("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };
  
  const handleCreateTransaction = async (newTransaction: any) => {
    if (!newTransaction.note || Number(newTransaction.amount) <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }

    try {
      const addedTransaction = await createTransaction({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount.toString()),
        category_id: Number(newTransaction.category_id),
      });

      setTransactions([...transactions, addedTransaction]);
      setShowAddModal(false);
      
      await fetchSummary();
    } catch (err) {
      console.error("❌ Failed to add transaction:", err);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const handleEditClick = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const handleSaveTransaction = async (updatedTransaction: any) => {
    console.log("Updating Transaction:", updatedTransaction);

    try {
      const sanitizedTransaction = {
        ...updatedTransaction,
        category_id: Number(updatedTransaction.category_id),
      };

      await updateTransaction(sanitizedTransaction.id, sanitizedTransaction);
      setTransactions(transactions.map(tx => (tx.id === sanitizedTransaction.id ? sanitizedTransaction : tx)));
      setSelectedTransaction(null);
      
      await fetchSummary();
    } catch (err) {
      console.error("❌ Failed to update transaction:", err);
      alert("Failed to update transaction. Please try again.");
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(tx => tx.id !== id));
      await fetchSummary();
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err);
      alert("Failed to delete transaction. Please try again.");
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-blue-700 dark:bg-gray-800 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            {/* <Image
              src="/gobudget-logo.svg"
              alt="GoBudget Logo"
              width={40}
              height={40}
              style={{ width: "auto", height: "40px" }}
            /> */}
            <span className="ml-2 text-xl font-semibold text-white">GoBudget</span>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <a
                href="#"
                className="bg-blue-800 dark:bg-gray-700 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-blue-300 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </a>

              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-blue-300 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Expenses
              </a>

              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-blue-300 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Budgets
              </a>

              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-blue-300 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Reports
              </a>

              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-blue-300 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-blue-800 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-blue-600 dark:bg-gray-700 flex items-center justify-center text-white font-semibold text-lg">
                  {user?.name || "Guest"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.email || "Guest"}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-blue-300 dark:text-gray-400 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="bg-blue-700 dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            {/* <Image
              src="/gobudget-logo.svg"
              alt="GoBudget Logo"
              width={30}
              height={30}
              style={{ width: "auto", height: "30px" }}
            /> */}
            <span className="ml-2 text-lg font-semibold text-white">GoBudget</span>
          </div>
          <button
            type="button"
            className="text-gray-200 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="bg-blue-700 dark:bg-gray-800 shadow-lg">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="bg-blue-800 dark:bg-gray-700 text-white block px-3 py-2 text-base font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium"
              >
                Expenses
              </a>
              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium"
              >
                Budgets
              </a>
              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium"
              >
                Reports
              </a>
              <a
                href="#"
                className="text-white hover:bg-blue-600 dark:hover:bg-gray-700 block px-3 py-2 text-base font-medium"
              >
                Settings
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-blue-800 dark:border-gray-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 dark:bg-gray-700 flex items-center justify-center text-white font-semibold text-lg">
                    {user?.name || "Guest"}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name || "Guest"}</div>
                  <div className="text-sm font-medium text-blue-300 dark:text-gray-400">{user?.email || "user@example.com"}</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-blue-600 dark:hover:bg-gray-700 rounded-md"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            
            {/* Dashboard content */}
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Balance
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              ${summary?.balance?.toFixed(2) || "0.00"}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Income
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              ${summary?.total_income?.toFixed(2) || "0.00"}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Expenses
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              ${summary?.total_expense?.toFixed(2) || "0.00"}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent activity section */}
            <RecentActivity />  
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

// return (
//   <div className={`min-h-screen p-6 transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
//     <div className="max-w-2xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Welcome, {user?.email || "Guest"}!</h1>
//         <Switch />
//       </div>
//       <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mb-6 transition">
//         Logout
//       </button>
      
//       <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
//         <h2 className="text-lg font-semibold">Summary</h2>
//         <p>Total Income: <span className="text-green-600 font-bold">${summary?.total_income?.toFixed(2) || "0.00"}</span></p>
//         <p>Total Expense: <span className="text-red-600 font-bold">${summary?.total_expense?.toFixed(2) || "0.00"}</span></p>
//         <p>Balance: <span className="font-bold">${summary?.balance?.toFixed(2) || "0.00"}</span></p>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Transactions</h2>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
//         >
//           + Add Transaction
//         </button>
//       </div>

//       <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} p-4 rounded-lg shadow-md transition`}>
//         {transactions.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-400">No transactions found.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {transactions.map(tx => (
//               <li key={tx.id} className="flex justify-between items-center py-3">
//                 <div>
//                   <p className="font-medium">{tx.note}</p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">{tx.amount} ({tx.type})</p>
//                   <p className="text-xs text-gray-400 dark:text-gray-500">Category: {tx.Category?.name || "Uncategorized"}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={() => handleEditClick(tx)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDeleteTransaction(tx.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>

//     {showAddModal && (
//       <AddTransactionModal
//         categories={categories}
//         onClose={() => setShowAddModal(false)}
//         onSave={handleCreateTransaction}
//       />
//     )}

//     {selectedTransaction && (
//       <EditTransactionModal
//         transaction={selectedTransaction}
//         categories={categories}
//         onClose={() => setSelectedTransaction(null)}
//         onSave={handleSaveTransaction}
//       />
//     )}
//   </div>
// );