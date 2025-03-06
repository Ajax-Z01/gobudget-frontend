import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/register", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};


export const getUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
