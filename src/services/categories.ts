import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCategories = async () => {
  try {
    const response = await api.get("/categories", { headers: getAuthHeaders() });
    console.log("🔍 Fetched categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (categoryData: any) => {
  try {
    const response = await api.post("/categories", categoryData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
