import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

/**
 * Add docs to the incomes colection on the database (firebase)
 */
export const useAddIncome = () => {

  const incomesCollection = collection(db, 'incomes');
  const { userId } = useGetUserInfo();

  const addIncome = async ({
    description,
    amount,
  } ) => {
    await addDoc(incomesCollection, { // choose what we want to add to our collection
      userId, // TODO: change this to 'auth.currentUser.uid
      description, // description of the transaction
      amount,
      createdAt: serverTimestamp(), // date of the transaction
    });
  };

  return { addIncome };
}