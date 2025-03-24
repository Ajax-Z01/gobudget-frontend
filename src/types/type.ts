export type TransactionType = "Income" | "Expense";
  
export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  currency: string;
  exchange_rate: number;
  note?: string;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TransactionParams {
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  category_id?: number;
}

export type Summary = {
  total_income: number;
  total_expense: number;
  balance: number;
};

export type Category = {
  id: number;
  name: string;
}

export interface Budget {
  id: number;
  user_id: number;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
  amount: number;
  spent: number;
  created_at: string;
  updated_at: string;
}

export type NewBudget = {
  category_id: number;
  amount: number;
};