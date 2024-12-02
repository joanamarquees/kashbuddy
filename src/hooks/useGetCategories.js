import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoriesCollectionRef = collection(db, "categories"); // change to incomes or expenses
  const { userId } = useGetUserInfo();

  useEffect(() => {
    let unsubscribe;

    try {
    const queryCategories = query(
      categoriesCollectionRef,
      where("userId", "==", userId),
      orderBy("value")
    );

    unsubscribe = onSnapshot(queryCategories, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data(); // get the data from the firebase doc
          const id = doc.id
          
          docs.push({ id, ...data });
        })

        setCategories(docs);
        setLoading(false);
      })
      
    } catch (err) {
      console.error(err);
      setLoading(false);
      }

    return () => unsubscribe();
  }, [categoriesCollectionRef, userId]);

  return {
    categories,
    loading
  };
};
