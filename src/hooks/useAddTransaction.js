import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

/**
 * Add docs to the expenses colection on the database (firebase)
 */
export const useAddTransaction = () => {

  const transactionsCollection = collection(db, 'transactions');
  const { userId } = useGetUserInfo();

  const addTransaction = async ({
    description,
    amount,
    category,
    transactionType,
  } ) => {
    await addDoc(transactionsCollection, { // choose what we want to add to our collection
      userId, // TODO: change this to 'auth.currentUser.uid
      description, // description of the transaction
      amount,
      category, // category of the transaction
      transactionType, // type of transaction (income or expense)
      createdAt: serverTimestamp(), // date of the transaction
    });
  };

  return { addTransaction };
}
