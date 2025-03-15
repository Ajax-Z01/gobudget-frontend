"use client";
import { createContext, useContext, useState, useEffect } from "react";

type SettingsContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (language: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState("IDR");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedLanguage = localStorage.getItem("language");

    if (savedCurrency) setCurrency(savedCurrency);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
