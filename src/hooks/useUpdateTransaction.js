import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

/**
 * Update the amount value on a given account on the database (firebase)
 */
export const useUpdateTransaction = () => {

  const updateTransaction = async ({id, transactionType, description, amount, category}) => {
    const transactionRef = doc(db, 'transactions', id);

    const updated = await updateDoc(transactionRef, {
      transactionType,
      description,
      amount,
      category
    });

    if (!updated) {
      console.error('No matching documents found');
    }
  }

  return {
    updateTransaction
  };
}
