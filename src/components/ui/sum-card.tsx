import React, { JSX } from "react";
import Link from "next/link";
import { useSettings } from "@/app/context/SettingContext";
import { translations } from "@/utils/translations";

const Card: React.FC<{ title: string; value: number; color: string; icon: JSX.Element }> = ({ title, value, color, icon }) => {
  const { currency, language } = useSettings();
  const t = translations[language === "English" ? "en" : "id"];

  return (
    <div className="card overflow-hidden shadow-lg rounded-lg">
      <div className="p-5 flex items-center">
        <div className="flex-shrink-0 rounded-md p-3" style={{ backgroundColor: `var(--${color})` }}>
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </div>
        <div className="ml-5 flex-1">
          <dl>
            <dt className="text-sm font-medium truncate card-title">{title}</dt>
            <dd className="text-lg font-medium" style={{ color: "var(--card-text)" }}>
            {new Intl.NumberFormat(language === "Bahasa" ? "id-ID" : "en-US", {
                style: "currency",
                currency,
              }).format(value)}
            </dd>
          </dl>
        </div>
      </div>
      <div className="px-5 py-3" style={{ backgroundColor: "var(--border-color)" }}>
        <div className="text-sm">
          <Link href="/reports" className="font-medium hover:underline" style={{ color: "var(--card-text)" }}>
            {t.view_all}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
