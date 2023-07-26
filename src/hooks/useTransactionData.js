import { useEffect, useState } from "react";
import { getRecent3MonthsTransactions } from "../API/API";
//useTransactionData
export const useTransactionData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentTime = new Date();
        const transactions = await getRecent3MonthsTransactions(currentTime);
        setData(transactions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
