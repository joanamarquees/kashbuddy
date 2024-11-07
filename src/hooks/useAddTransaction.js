import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';
import { useUpdateAccount } from './useUpdateAccount'


/**
 * Add docs to the expenses colection on the database (firebase)
 */
export const useAddTransaction = () => {
  const { updateAmount } = useUpdateAccount();

  const transactionsCollection = collection(db, 'transactions');
  const { userId } = useGetUserInfo();

  const addTransaction = async ({
    description,
    amount,
    categoryId,
    transactionType,
    date,
    accountId,
  } ) => {

    const accountDoc = await getDoc(doc(db, 'accounts', accountId));
    const account = accountDoc.data();
    const bankName = account.bankName;
    let accountAmount = account.amount;

    accountAmount = (transactionType === 'expense' ? accountAmount - amount : accountAmount + amount);

    await updateAmount({
      bankName,
      'amount': accountAmount,
    });

    await addDoc(transactionsCollection, { // choose what we want to add to our collection
      userId, // TODO: change this to 'auth.currentUser.uid
      description,
      amount,
      categoryId,
      transactionType,
      date,
      accountId,
    });
  };

  return { addTransaction };
}
