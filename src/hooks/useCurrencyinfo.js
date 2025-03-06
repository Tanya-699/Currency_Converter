import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currency) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${currency}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch currency data");
        }
        const result = await res.json();
        setData(result.rates);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [currency]);

  return { data, error };
}

export default useCurrencyInfo;
