import React from "react";
import { Transaction } from "@/types/type";
import { Button } from "@/components/ui/button";

type TransactionListProps = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
};

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

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="mt-4 p-2">
      <h2 className="text-lg font-medium title-name">Transactions History</h2>
      <div className="mt-4 card shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-[var(--border-color)]">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="hover:bg-[var(--border-color)] dark:hover:bg-[var(--border-color)] transition-all"
              >
                <div className="px-4 py-4 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  
                  {/* Bagian Kiri - Nama, Tanggal, & Tipe */}
                  <div className="flex-1">
                    {/* Nama transaksi / Catatan */}
                    <div className="text-sm font-medium card-title truncate">{transaction.note || "No Note"}</div>

                    {/* Tanggal transaksi */}
                    <div className="mt-1 flex items-center text-sm text-[var(--foreground)]">
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

                    {/* Type Transaksi */}
                    <span
                      className={`mt-2 inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                        transaction.type === "Income"
                          ? "bg-[var(--primary)] text-[var(--text-black)]"
                          : "bg-[var(--tertiary)] text-[var(--text-black)]"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </div>

                  {/* Bagian Kanan - Jumlah & Tombol Aksi */}
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                    
                    {/* Jumlah Transaksi */}
                    <span
                      className={`text-lg font-semibold ${
                        transaction.type === "Income" ? "text-[var(--primary)]" : "text-[var(--tertiary)]"
                      }`}
                    >
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.amount)}
                    </span>

                    {/* Tombol Aksi */}
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="secondary" onClick={() => onEdit(transaction)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => onDelete(transaction.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 text-center text-gray-500">No transactions found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
