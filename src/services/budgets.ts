import axios from "axios";
import Cookies from "js-cookie";
import { NewBudget, Budget } from "@/types/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://gobudget-backend-production.up.railway.app";

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
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const response = await api.get("/budgets");
    return response.data.map((budget: Budget) => ({
      ...budget,
      spent: budget.spent || 0,
    }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error fetching budgets:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch budgets");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createBudget = async (budgetData: NewBudget) => {
  try {
    const response = await api.post("/budgets", budgetData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error creating budget:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to create budget");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateBudget = async (id: number, updatedData: Partial<Budget>): Promise<Budget> => {
  try {
    const response = await api.put(`/budgets/${id}`, updatedData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error updating budget:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to update budget");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteBudget = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await api.put(`/budgets/delete/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error deleting budget:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to delete budget");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const restoreBudget = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await api.put(`/budgets/restore/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error restoring budget:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to restore budget");
    }
    throw new Error("An unexpected error occurred");
  }
};
