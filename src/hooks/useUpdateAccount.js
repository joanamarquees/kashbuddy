import { where, query, getDocs, updateDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';

/**
 * Update the amount value on a given account on the database (firebase)
 */
export const useUpdateAccount = () => {

  const updateAmount = async ({bankName, amount}) => {
    const accountsCollection = collection(db, 'accounts');

    try {
      const queryAccount = query(
        accountsCollection,
        where("bankName", "==", bankName),
      );

      const querySnapshot = await getDocs(queryAccount);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          amount,
        });
      } else {
        console.error('No matching documents found');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return { updateAmount };
}
