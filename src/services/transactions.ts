import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getTransactions = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/transactions`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const createTransaction = async (transactionData: any) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (id: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/transactions/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const response = await axios.put(`${API_URL}/transactions/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const getSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions/summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};
