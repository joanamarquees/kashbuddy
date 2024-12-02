import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

/**
 * Add docs to the expenses colection on the database (firebase)
 */
export const useAddCategory = () => {

  const categoriesCollection = collection(db, 'categories');
  const { userId } = useGetUserInfo();

  const addCategory = async ({
    value,
    label,
    iconIndex,
    color,
    categoryType,
  }) => {
    await addDoc(categoriesCollection, {
      userId,
      value,
      label,
      iconIndex,
      color,
      categoryType,
    });
  };

  return { addCategory };
}
