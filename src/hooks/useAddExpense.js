import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

/**
 * Add docs to the expenses colection on the database (firebase)
 */
export const useAddExpense = () => {

  const expensesCollection = collection(db, 'expenses');
  const { userId } = useGetUserInfo();

  const addExpense = async ({
    description,
    amount,
    category,
  } ) => {
    await addDoc(expensesCollection, { // choose what we want to add to our collection
      userId, // TODO: change this to 'auth.currentUser.uid
      description, // description of the transaction
      amount,
      category, // category of the transaction
      createdAt: serverTimestamp(), // date of the transaction
    });
  };

  return { addExpense };
}
