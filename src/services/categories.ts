import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

interface Category {
  id: number;
  name: string;
}

interface NewCategory {
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories", { headers: getAuthHeaders() });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error fetching categories:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch categories");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createCategory = async (categoryData: NewCategory): Promise<Category> => {
  try {
    const response = await api.post("/categories", categoryData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error creating category:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to create category");
    }
    throw new Error("An unexpected error occurred");
  }
};
