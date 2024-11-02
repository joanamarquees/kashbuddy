import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  const categoriesCollectionRef = collection(db, "categories"); // change to incomes or expenses
  const { userId } = useGetUserInfo();

  const getCategories = async () => {
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
      })
      
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  }
  
  useEffect(() => {
    getCategories()
  }, []);

  return { categories };
}