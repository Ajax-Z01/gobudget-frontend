import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

console.log("🔍 API_URL:", API_URL);

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
    console.log("✅ Response from:", response.config.url);
    console.log("✅ Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getTransactions = async (params: Record<string, any> = {}) => {
  try {
    if (typeof params !== "object" || params === null) {
      throw new TypeError("Params must be an object");
    }

    const response = await api.get("/transactions", { params });
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching transactions:", error.response?.data || error.message);
    throw error;
  }
};

export const createTransaction = async (transactionData: Record<string, any>) => {
  try {
    if (!transactionData || typeof transactionData !== "object") {
      throw new TypeError("Transaction data must be an object");
    }

    console.log("🔍 Creating transaction with data:", transactionData);

    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const getTransactionById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Transaction ID is required");
    }

    console.log("🔍 Fetching transaction with ID:", id);

    const response = await api.get(`/transactions/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTransaction = async (id: string, updatedData: Record<string, any>) => {
  try {
    if (!id || !updatedData || typeof updatedData !== "object") {
      throw new TypeError("Invalid transaction update data");
    }

    console.log("🔍 Updating transaction:", { id, updatedData });

    const response = await api.put(`/transactions/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error updating transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Transaction ID is required for deletion");
    }

    console.log("🔍 Soft deleting transaction with ID:", id);

    const response = await api.put(`/transactions/delete/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error deleting transaction:", error.response?.data || error.message);
    throw error;
  }
};

export const getSummary = async () => {
  try {
    console.log("🔍 Fetching summary");

    const response = await api.get("/summary");
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching summary:", error.response?.data || error.message);
    throw error;
  }
};
