import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore';
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
    categoryId,
    transactionType,
    date,
    accountId,
  } ) => {
    await addDoc(transactionsCollection, { // choose what we want to add to our collection
      userId, // TODO: change this to 'auth.currentUser.uid
      description,
      amount,
      categoryId,
      transactionType,
      date,
      accountId,
    });
  };

  return { addTransaction };
}
