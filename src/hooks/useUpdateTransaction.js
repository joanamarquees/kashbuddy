import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useUpdateAccount } from './useUpdateAccount'

/**
 * Update the amount value on a given account on the database (firebase)
 */
export const useUpdateTransaction = () => {
  const { updateAmount } = useUpdateAccount();

  const updateTransaction = async ({
    id,
    transactionType,
    description,
    amount,
    categoryId,
    date,
    accountId
  }) => {
    const transactionRef = doc(db, 'transactions', id);
    
    const transactionDoc = await getDoc(transactionRef);
    if (!transactionDoc.exists()) {
      console.error('No matching documents found');
      return;
    }

    const accountDoc = await getDoc(doc(db, 'accounts', accountId));
    if (!accountDoc.exists()) {
      console.error('No matching account found');
      return;
    }

    const currentAmount = transactionDoc.data().amount;
    const addedAmount = amount - currentAmount;

    const account = accountDoc.data();
    const bankName = account.bankName;
    const accountAmount = account.amount + addedAmount;

    await updateAmount({
      bankName,
      amount: accountAmount,
    });
    
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
