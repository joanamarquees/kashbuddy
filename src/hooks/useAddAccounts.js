import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

/**
 * Add docs to the accounts colection on the database (firebase)
 */
export const useAddAccount = () => {

  const accountsCollection = collection(db, 'accounts');
  const { userId } = useGetUserInfo();

  const addAccount = async ({
    bankName,
    amount,
  } ) => {
    await addDoc(accountsCollection, {
      userId, // TODO: change this to 'auth.currentUser.uid
      bankName, 
      amount,
    });
  };

  return { addAccount };
}
