
/**
 * Calculate net worth based on accounts and transactions.
 * @param {Array} accounts - Array of account objects, each with a name and balance.
 * @param {Array} transactions - Array of transaction objects, each with amount and fromAccount or toAccount.
 * @returns {Object} - Object with updated account balances and total net worth.
 */
export function calculateNetworth(accounts, transactions = []) {
  const totalNetworth = Number(accounts.reduce((acc, account) => acc + account.amount, 0).toFixed(2));

  // Total expenses for the month
  const expenses = transactions.filter(transaction => transaction.transactionType === 'expense'); // && transaction.createdAt.toDate().getMonth() === currentMonth);
  const totalExpenses = Number(expenses.reduce((exp, transaction) => exp + transaction.amount, 0).toFixed(2));

  //Total incomes for the month
  const incomes = transactions.filter(transaction => transaction.transactionType === 'income');
  const totalIncomes = Number(incomes.reduce((inc, transaction) => inc + transaction.amount, 0).toFixed(2));
  
  return {
    totalNetworth,
    totalExpenses,
    totalIncomes,
  };
}
