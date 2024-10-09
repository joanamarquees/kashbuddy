import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const accountsCollection = collection(db, 'accounts');
  const { userId } = useGetUserInfo();

  const getAccounts = async () => {
    let unsubscribe;

    try {
      const queryAccounts = query(
        accountsCollection,
        where("userId", "==", userId),
        orderBy("amount", "desc")// TODO: check if the desc is correctly set
      );

    unsubscribe = onSnapshot(queryAccounts, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data(); // get the data from the firebase doc
          const id = doc.id
          
          docs.push({ id, ...data });            
        })

        setAccounts(docs);
      })
      
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  }
  
  useEffect(() => {
    getAccounts()
  }, []);

  return { accounts };
}