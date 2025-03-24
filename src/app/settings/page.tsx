"use client";
import { useState, useEffect } from "react";
import { useSettings } from "@/app/context/SettingContext";
import { getUser, logout } from "@/services/auth";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import Switch from "@/components/ui/theme-switcher";
import { useRouter } from "next/navigation";
import { translations } from "@/utils/translations";

export default function SettingsPage() {
  const router = useRouter();
  const { currency, setCurrency, language, setLanguage } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; name: string } | undefined>(undefined);
  

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedLanguage = localStorage.getItem("language");

    if (savedCurrency) setCurrency(savedCurrency);
    if (savedLanguage) setLanguage(savedLanguage);
    
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err: unknown) {
        console.error("❌ Error fetching data:", err instanceof Error ? err.message : String(err));
        setError("Failed to fetch data. Redirecting to login...");
        router.replace("/login");
      }
    };

    fetchUser();
  }, [router, setCurrency, setLanguage]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };
  
  if (error) {
    return <div className="text-center mt-10 text-error">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar user={user} handleLogout={handleLogout} />
      <MobileMenu user={user} handleLogout={handleLogout} />

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold title-name">{t.settings}</h1>

            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-lg">
                <span className="text-lg title-name">{t.dark_mode}</span>
                <Switch />
              </div>

              <div className="flex flex-col p-4 border border-[var(--border-color)] rounded-lg">
                <label className="text-lg mb-2 title-name">{t.currency}</label>
                <select
                  className="p-2 border rounded-lg bg-card text-foreground"
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <option className="text-[var(--text-black)]" value="IDR">IDR - Indonesian Rupiah</option>
                  <option className="text-[var(--text-black)]" value="USD">USD - US Dollar</option>
                  <option className="text-[var(--text-black)]" value="EUR">EUR - Euro</option>
                  <option className="text-[var(--text-black)]" value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>

              <div className="flex flex-col p-4 border border-[var(--border-color)] rounded-lg">
                <label className="text-lg mb-2 title-name">{t.language}</label>
                <select
                  className="p-2 border rounded-lg bg-card text-foreground"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option className="text-[var(--text-black)]" value="English">English</option>
                  <option className="text-[var(--text-black)]" value="Bahasa">Bahasa Indonesia</option>
                </select>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
