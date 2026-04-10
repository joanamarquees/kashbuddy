import { useEffect, useState } from "react";
import {
	AddTransactionCard,
	SmallLoadingScreen,
	TransactionCard,
} from "@/components/index.js";
import { useData } from "@/context/DataContext";

export function DisplayTransactions({ type, transactions, onAddClick }) {
	const { loading: dataLoading } = useData();
	const [isSwitching, setIsSwitching] = useState(false);
	const [prevType, setPrevType] = useState(type);

	// Detect type change during render to prevent content flash
	if (type !== prevType) {
		setPrevType(type);
		setIsSwitching(true);
	}

	useEffect(() => {
		if (isSwitching) {
			const timer = setTimeout(() => {
				setIsSwitching(false);
			}, 300); // 300ms smooth transition
			return () => clearTimeout(timer);
		}
	}, [isSwitching]);

	const total = transactions.reduce((counter, transaction) => {
		if (transaction.transactionType === type) {
			return counter + parseFloat(transaction.amount);
		}
		return counter;
	}, 0);

	if (dataLoading || isSwitching) {
		return <SmallLoadingScreen />;
	}

	if (total === 0) {
		return (
			<AddTransactionCard
				transactionType={type}
				onClick={onAddClick}
				text={`No ${type}s found for this month. Tap to add your first one and start tracking!`}
			/>
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
