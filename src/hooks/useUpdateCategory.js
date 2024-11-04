import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

/**
 * Update the amount value on a given account on the database (firebase)
 */
export const useUpdateCategory = () => {

  const updateCategory = async ({
    id,
    value,
    label,
    iconIndex,
    color,
    categoryType
  }) => {
    const categoryRef = doc(db, 'categories', id);

    const updated = await updateDoc(categoryRef, {
      value,
      label,
      iconIndex,
      color,
      categoryType
    });

    if (!updated) {
      console.error('No matching documents found');
    }
  }

  return {
    updateCategory
  };
}
