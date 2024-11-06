import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

/**
 * Update the amount value on a given account on the database (firebase)
 */
export const useUpdateTransaction = () => {

  const updateTransaction = async ({id, transactionType, description, amount, categoryId, date, accountId}) => {
    const transactionRef = doc(db, 'transactions', id);
    
    const transactionDoc = await getDoc(transactionRef);
    if (!transactionDoc.exists()) {
      console.error('No matching documents found');
      return;
    }
    
    await updateDoc(transactionRef, {
      description,
      amount,
      categoryId,
      transactionType,
      date,
      accountId,
    });
  }

  return {
    updateTransaction
  };
}
