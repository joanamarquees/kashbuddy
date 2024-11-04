import { collection, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

/**
 * Delete a document from the transactions collection on Firebase
 */
export const useDeleteCategory = () => {

  const deleteCategory = async ({ id }) => {
    console.log(`Deleting category ${id}`);

    const deleted = await deleteDoc(doc(db, 'categories', id));

    if (deleted) {
      console.log(`Deleted category: ${id}`);
    } else {
      console.log('No catgory found with the given id or category is beeing used');
    }
  };

  return { deleteCategory };
};
