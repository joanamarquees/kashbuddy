import {
	AddTransactionCard,
	Drawer,
	NewTransactionForms,
	setDrawerState,
	TransactionCard,
} from "../../../components/index.js";

export function DisplayTransactions({ type, transactions }) {
	const total = transactions.reduce((counter, transaction) => {
		if (transaction.transactionType === type) {
			return counter + parseFloat(transaction.amount);
		}
		return counter;
	}, 0);

	if (total === 0) {
		return (
			<>
				<Drawer
					views={{ "New-transaction": <NewTransactionForms type={type} /> }}
				/>
				<AddTransactionCard
					transactionType={type}
					onClick={() => setDrawerState("New-transaction")}
					text={`You don’t have any ${type} this month. Tap to add one.`}
				/>
			</>
		);
	}

	return (
		<div className="space-y-3">
			{transactions.map((transaction) => {
				const { id, transactionType } = transaction;

				if (transactionType === type) {
					return <TransactionCard key={id} transaction={transaction} />;
				}
				return null;
			})}
		</div>
	);
}
