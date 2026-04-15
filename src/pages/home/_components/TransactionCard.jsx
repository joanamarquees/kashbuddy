import { useState } from "react";
import { TransactionForm } from "@/components/index";
import { useData } from "@/context/DataContext";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction.js";
import { useUpdateTransaction } from "@/hooks/useUpdateTransaction.js";
import { iconList } from "@/utils/categories.js";

export const TransactionCard = ({ transaction }) => {
	const { categories, accounts } = useData();
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");

	const [transactionData, setTransactionData] = useState({
		...transaction,
		date:
			transaction.date instanceof Date
				? transaction.date
				: new Date((transaction.date?.seconds || 0) * 1000 || transaction.date),
	});

	const { updateTransaction } = useUpdateTransaction();
	const { deleteTransaction } = useDeleteTransaction();

	const category = categories?.find((c) => c.id === transaction.categoryId);
	const account = accounts?.find((a) => a.id === transaction.accountId);

	const Icon = iconList[category?.iconIndex];

	function closeModal() {
		setIsOpen(false);
		setError("");
		setTransactionData({
			...transaction,
			date:
				transaction.date instanceof Date
					? transaction.date
					: new Date(
							(transaction.date?.seconds || 0) * 1000 || transaction.date,
						),
		});
	}

	async function handleUpdateTransaction() {
		if (
			!transactionData.description ||
			!transactionData.amount ||
			!transactionData.categoryId ||
			!transactionData.transactionType ||
			!transactionData.date ||
			!transactionData.accountId
		) {
			setError("Please fill in all fields");
			return;
		}

		await updateTransaction({
			id: transactionData.id,
			transactionType: transactionData.transactionType,
			description: transactionData.description,
			amount: Number(parseFloat(transactionData.amount)),
			categoryId: transactionData.categoryId,
			date:
				transactionData.date instanceof Date
					? transactionData.date
					: new Date(transactionData.date),
			accountId: transactionData.accountId,
		});
		setIsOpen(false);
	}

	async function handleDeleteTransaction() {
		await deleteTransaction({ id: transaction.id });
		setIsOpen(false);
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="bg-light-background border-2 border-primary/10 rounded-xl w-full p-5 flex items-center justify-between group hover:border-[#818cf8]/30 transition-all active:scale-[0.98]"
			>
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
						{Icon && (
							<Icon
								style={{
									color: category?.color,
								}}
								className="w-6 h-6"
							/>
						)}
					</div>
					<div>
						<p className="font-bold text-sm tracking-tight text-left">
							{transaction.description}
						</p>
						<div className="flex items-center gap-1.5">
							<p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
								{category?.value || "Uncategorized"}
							</p>
						</div>
					</div>
				</div>
				<p className="text-right font-bold text-base tracking-tight text-white">
					{transaction.amount} €
				</p>
			</button>

			<TransactionForm
				isOpen={isOpen}
				onClose={closeModal}
				onSave={handleUpdateTransaction}
				onDelete={handleDeleteTransaction}
				transactionData={transactionData}
				setTransactionData={setTransactionData}
				category={category}
				account={account}
				isEdit={true}
				error={error}
				setError={setError}
			/>
		</>
	);
};
