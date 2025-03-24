export const getExchangeRates = async (baseCurrency: string) => {
  try {
    const res = await fetch(`/api/exchangeRates?baseCurrency=${baseCurrency}`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data?.rates || {};
  } catch (error) {
    console.error("❌ Error fetching exchange rates:", error);
    return {};
  }
};
