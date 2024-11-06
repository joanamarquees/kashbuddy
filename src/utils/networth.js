/**
 * Calculate net worth based on accounts and transactions.
 * @param {Array} accounts - Array of account objects, each with a name and balance.
 * @param {Array} transactions - Array of transaction objects, each with amount and fromAccount or toAccount.
 * @returns {Object} - Object with updated account balances and total net worth.
 */
export function calculateNetworth(accounts, transactions = []) {
  const totalNetworth = accounts.reduce((acc, account) => acc + parseFloat(account.amount), 0);

  // Total expenses for the month
  const expenses = transactions.filter(transaction => transaction.transactionType === 'expense'); // && transaction.createdAt.toDate().getMonth() === currentMonth);
  const totalExpenses = expenses.reduce((exp, transaction) => exp + parseFloat(transaction.amount), 0);

  //Total incomes for the month
  const incomes = transactions.filter(transaction => transaction.transactionType === 'income');
  const totalIncomes = incomes.reduce((inc, transaction) => inc + parseFloat(transaction.amount), 0);

  return {
    totalNetworth,
    totalExpenses,
    totalIncomes,
  };
}
