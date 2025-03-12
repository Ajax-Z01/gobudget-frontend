import axios from "axios";
import Cookies from "js-cookie";
import { Transaction, TransactionParams } from "@/types/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getTransactions = async (params: TransactionParams = {}): Promise<Transaction[]> => {
  try {
    const response = await api.get("/transactions", { params });
    console.log("🔍 Fetched transactions:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching transactions:", error.response?.data || error.message);
    throw error;
  }
};

export const createTransaction = async (transactionData: Omit<Transaction, "id" | "created_at" | "updated_at">): Promise<Transaction> => {
  try {
    console.log("🔍 Creating transaction with data:", transactionData);
    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
  try {
    console.log("🔍 Fetching transaction with ID:", id);
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTransaction = async (id: number, updatedData: Partial<Omit<Transaction, "id" | "created_at" | "updated_at">>): Promise<Transaction> => {
  try {
    console.log("🔍 Updating transaction:", { id, updatedData });
    const response = await api.put(`/transactions/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error updating transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteTransaction = async (id: number): Promise<{ message: string }> => {
  try {
    console.log("🔍 Soft deleting transaction with ID:", id);
    const response = await api.put(`/transactions/delete/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error deleting transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const restoreTransaction = async (id: number): Promise<{ message: string }> => {
  try {
    console.log("🔍 Restoring transaction with ID:", id);
    const response = await api.put(`/transactions/restore/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error restoring transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const getSummary = async (): Promise<{ total_income: number; total_expense: number; balance: number }> => {
  try {
    console.log("🔍 Fetching summary");
    const response = await api.get("/summary");
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching summary:", error.response?.data || error.message);
    throw error;
  }
};
