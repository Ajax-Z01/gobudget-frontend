export const categoryTranslations: Record<string, { en: string; id: string }> = {
    "food": { en: "Food", id: "Makanan" },
    "transport": { en: "Transport", id: "Transportasi" },
    "entertainment": { en: "Entertainment", id: "Hiburan" },
    "health": { en: "Health", id: "Kesehatan" },
    "shopping": { en: "Shopping", id: "Belanja" },
    "education": { en: "Education", id: "Pendidikan" },
    "others": { en: "Others", id: "Lainnya" },
    "salary": { en: "Salary", id: "Gaji" },
    "bills": { en: "Bills", id: "Tagihan" },
    "investment": { en: "Investment", id: "Investasi" },
    "transportation": { en: "Transportation", id: "Transportasi" },
  };
  
  export const getTranslatedCategory = (category: string, language: string) => {
    const lowerCategory = category.toLowerCase();
    return categoryTranslations[lowerCategory]?.[language === "English" ? "en" : "id"] || category;
  };
  