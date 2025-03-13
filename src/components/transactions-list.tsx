import React from "react";
import { Transaction } from "@/types/type";
import { Button } from "@/components/ui/button";

type TransactionListProps = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, setTransactions, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions History</h2>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.id} className="p-3 border rounded-lg flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">{transaction.note}</p>
              <p className="text-gray-600">${transaction.amount}</p>
            </div>
            <div className="flex gap-2">
              {/* Tombol Edit */}
              <Button variant="secondary" onClick={() => onEdit(transaction)}>Edit</Button>

              {/* Tombol Delete */}
              <Button variant="danger" onClick={() => onDelete(transaction.id)}>Delete</Button>
            </div>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
