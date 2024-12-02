import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = () => {
    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionRef,
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
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

    return () => unsubscribe && unsubscribe();
  };

  useEffect(() => {
    getTransactions();
    return () => {
      setLoading(true);
    };
  }, []);

  return {
    transactions,
    loading
  };
};
