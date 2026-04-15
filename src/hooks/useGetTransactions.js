import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useGetUserInfo();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let unsubscribe;

    try {
      const queryTransactions = query(
        collection(db, "transactions"),
        where("userId", "==", userId),
        orderBy("date", "desc")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ id, ...data });
        });

        setTransactions(docs);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

    return () => unsubscribe && unsubscribe();
  }, [userId]);

  return {
    transactions,
    loading
  };
};
