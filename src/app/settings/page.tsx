"use client";
import { useEffect } from "react";
import { useSettings } from "@/app/context/SettingContext";
import Sidebar from "@/components/sidebar";
import MobileMenu from "@/components/mobile-menu";
import Switch from "@/components/ui/theme-switcher";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { translations } from "@/utils/translations";

export default function SettingsPage() {
  const router = useRouter();
  const { currency, setCurrency, language, setLanguage } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedLanguage = localStorage.getItem("language");

    if (savedCurrency) setCurrency(savedCurrency);
    if (savedLanguage) setLanguage(savedLanguage);
  }, [setCurrency, setLanguage]);

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
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      Cookies.remove("token");
      router.replace("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar handleLogout={handleLogout} />
      <MobileMenu handleLogout={handleLogout} />

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
