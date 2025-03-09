import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/register", { name, email, password });
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data);
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/user");
    console.log("Fetched user:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get user error:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error: any) {
    console.error("Logout error:", error.response?.data);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
