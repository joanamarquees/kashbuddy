import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

/**
 * Delete a document from the accounts collection on Firebase
 */
export const useDeleteAccount = () => {

  const accountsCollection = collection(db, 'accounts');
  const { userId } = useGetUserInfo();

  const deleteAccount = async ({bankName}) => {

    const account = query(
      accountsCollection,
      where("userId", "==", userId),
      where("bankName", "==", bankName),
    );

    const accountSnapshot = await getDocs(account);
    
    if (!accountSnapshot.empty) {
      // Get the document ID (assuming only one match)
      const docId = accountSnapshot.docs[0].id;

      // Get a reference to the specific document by ID
      const accountDocRef = doc(db, 'accounts', docId);

      // Delete the document
      await deleteDoc(accountDocRef);

      console.log(`Deleted account for bank: ${bankName}`);
    } else {
      console.log('No account found with the given bankName for this user.');
    }
  };

  return { deleteAccount };
};
