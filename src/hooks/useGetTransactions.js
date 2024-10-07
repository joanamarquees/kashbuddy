import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const transactionCollectionRef = collection(db, "transactions"); // change to incomes or expenses
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")// TODO: check if the desc is correctly set
      );

    unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data(); // get the data from the firebase doc
          const id = doc.id
          
          docs.push({ id, ...data });            
        })

        setTransactions(docs);
      })
      
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  }
  
  useEffect(() => {
    getTransactions()
  }, []);

  return { transactions };
}