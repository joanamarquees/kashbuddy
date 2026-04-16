import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { HiOutlineWallet } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
	AddButton,
	Calendar,
	Header,
	LoadingScreen,
	TransactionForm,
	TransactionSwitch,
} from "@/components/index.js";
import { useAddTransaction } from "@/hooks/useAddTransaction.js";
import { useGetAccounts } from "@/hooks/useGetAccounts.js";
import { useGetTransactions } from "@/hooks/useGetTransactions.js";

import { TotalBalanceCard } from "./_components/BalanceCard.jsx";
import { DisplayCategories } from "./_components/DisplayCategories.jsx";
import { DisplayTransactions } from "./_components/DisplayTransactions.jsx";
import { StatsCard } from "./_components/StatsCard.jsx";

dayjs.extend(isoWeek);

const EMPTY_TRANSACTION = (type) => ({
	description: "",
	amount: "",
	categoryId: "",
	transactionType: type,
	date: new Date(),
	accountId: "",
});

export function Home() {
	const navigate = useNavigate();
	const { transactions, loading } = useGetTransactions();
	const { accounts, loading: accountsLoading } = useGetAccounts();
	const { addTransaction } = useAddTransaction();

	const [flip, setFlip] = useState(false);
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [transactionType, setTransactionType] = useState("expense");
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactions);
	const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
	const [newTransactionData, setNewTransactionData] = useState(
		EMPTY_TRANSACTION("expense"),
	);
	const [error, setError] = useState("");

	const handleOpenNewTransaction = () => {
		setNewTransactionData(EMPTY_TRANSACTION(transactionType));
		setError("");
		setIsNewTransactionOpen(true);
	};

	const handleTransactionTypeChange = (e) => {
		setTransactionType(e.target.value);
	};

	const handleAddTransaction = async () => {
		if (
			!newTransactionData.description ||
			!newTransactionData.amount ||
			!newTransactionData.categoryId ||
			!newTransactionData.transactionType ||
			!newTransactionData.date ||
			!newTransactionData.accountId
		) {
			setError("Please fill in all fields");
			return;
		}
		await addTransaction({
			description: newTransactionData.description,
			amount: Number(parseFloat(newTransactionData.amount)),
			categoryId: newTransactionData.categoryId,
			transactionType: newTransactionData.transactionType,
			date: new Date(newTransactionData.date),
			accountId: newTransactionData.accountId,
		});
		setIsNewTransactionOpen(false);
	};

	const flipCard = () => {
		setFlip(!flip);
	};

	useEffect(() => {
		const filtered = transactions.filter((transaction) => {
			const transactionDate =
				transaction.date instanceof Date
					? transaction.date
					: transaction.date.toDate();
			return dayjs(transactionDate).isSame(currentDate, "month");
		});

		setFilteredTransactions(filtered);
	}, [currentDate, transactions]);

	return (
		<>
			<div className="container mx-auto px-5 flex-1 overflow-y-scroll">
			{/* Header */}
			<Header
				leftIcon={
					<HiOutlineWallet
						size={35}
						className="text-indigo-400 cursor-pointer"
						onClick={() => navigate("/accounts")}
					/>
				}
				centerElement={
					<Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
				}
				rightIcon={
					<IoSettingsOutline
						size={35}
						className="text-indigo-400 cursor-pointer"
						onClick={() => navigate("/settings")}
					/>
				}
			/>

			{/* Main Content */}
			<div className="h-full w-full mx-auto place-items-center space-y-8">
				{loading || accountsLoading ? (
					<LoadingScreen />
				) : (
					<>
						<ReactCardFlip
							flipDirection="horizontal"
							isFlipped={flip}
							containerClassName="h-52"
						>
							<button
								type="button"
								className="w-full cursor-pointer"
								onClick={flipCard}
							>
								<TotalBalanceCard
									transactions={filteredTransactions}
									accounts={accounts}
								/>
							</button>

							<button
								type="button"
								className="w-full cursor-pointer"
								onClick={flipCard}
							>
								<StatsCard
									transactions={filteredTransactions}
									type={transactionType}
								/>
							</button>
						</ReactCardFlip>

						{/* Transaction switch */}
						<TransactionSwitch
							type={transactionType}
							handleChange={handleTransactionTypeChange}
						/>

						{/* If flip is true display categories, else display transactions */}
						{flip ? (
							<DisplayCategories
								type={transactionType}
								transactions={filteredTransactions}
								onAddClick={handleOpenNewTransaction}
							/>
						) : (
							<DisplayTransactions
								type={transactionType}
								transactions={filteredTransactions}
								onAddClick={handleOpenNewTransaction}
							/>
						)}
					</>
				)}
			</div>

			{/* Add Transaction Form */}
			<TransactionForm
				isOpen={isNewTransactionOpen}
				onClose={() => setIsNewTransactionOpen(false)}
				onSave={handleAddTransaction}
				transactionData={newTransactionData}
				setTransactionData={setNewTransactionData}
				isEdit={false}
				error={error}
				setError={setError}
			/>

		</div>
			<AddButton onClick={handleOpenNewTransaction} />
		</>
	);
}
