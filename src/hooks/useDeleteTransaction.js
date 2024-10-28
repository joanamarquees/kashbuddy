import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

/**
 * Delete a document from the transactions collection on Firebase
 */
export const useDeleteTransaction = () => {

  const deleteTransaction = async ({id}) => {
    console.log(`Deleting transaction for id: ${id}`);

    const deleted = await deleteDoc(doc(db, 'transactions', id));

    if (deleted) {
      console.log(`Deleted transaction for id: ${id}`);
    } else {
      console.log('No transaction found with the given id for this user.');
    }
  };

  return { deleteTransaction };
};
