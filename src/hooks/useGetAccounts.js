import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const accountsCollection = collection(db, 'accounts');
  const { userId } = useGetUserInfo();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const queryAccounts = query(
      accountsCollection,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      queryAccounts,
      (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ id, ...data });
        });

        setAccounts(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching accounts: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, accountsCollection]);

  return {
    accounts,
    loading
  };
};
