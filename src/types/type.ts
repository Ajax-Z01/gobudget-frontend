export enum TransactionType {
  INCOME = "Income",
  EXPENSE = "Expense",
}
  
export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  note?: string;
  category_id: number;
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

export interface Budget {
  id: number;
  category_id: number;
  amount: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}  

export type NewBudget = {
  category_id: number;
  amount: number;
};