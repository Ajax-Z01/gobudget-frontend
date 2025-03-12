import axios from "axios";
import Cookies from "js-cookie";
import { NewBudget, Budget } from "@/types/type";

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
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const response = await api.get("/budgets");
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching budgets:", error.response?.data || error.message);
    throw error;
  }
};

export const createBudget = async (budgetData: NewBudget) => {
    try {
      const response = await api.post("/budgets", budgetData);
      return response.data;
    } catch (error: any) {
      console.error("❌ Error creating budget:", error.response?.data || error.message);
      throw error;
    }
  };  

export const updateBudget = async (id: number, updatedData: Partial<Budget>): Promise<Budget> => {
  try {
    const response = await api.put(`/budgets/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error updating budget:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBudget = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error deleting budget:", error.response?.data || error.message);
    throw error;
  }
};

export const restoreBudget = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await api.put(`/budgets/restore/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error restoring budget:", error.response?.data || error.message);
    throw error;
  }
};