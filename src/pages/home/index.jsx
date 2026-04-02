import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { HiOutlineWallet } from "react-icons/hi";
import { IoAddCircle, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // to change from login to home page
import { DisplayCategories } from "../../components/DisplayCategories.jsx";
import { DisplayTransactions } from "../../components/DisplayTransactions.jsx";
import { FinancialStats } from "../../components/FinancialStats.jsx";
import { Header } from "../../components/Header.jsx";
import { NewTransactionForms } from "../../components/NewTransaction.jsx";
import { TransactionSwitch } from "../../components/TransactionSwitch.jsx";
import { Calendar } from "../../components/ui/Calendar.jsx";
import { FinancialCard } from "../../components/ui/Cards.jsx";
import { Drawer, setDrawerState } from "../../components/ui/Drawer.jsx";
import { useGetAccounts } from "../../hooks/useGetAccounts.js";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";

dayjs.extend(isoWeek);

export function Home() {
	const navigate = useNavigate();
	const { transactions, loading } = useGetTransactions();
	const { accounts, loading: accountsLoading } = useGetAccounts();

	const [flip, setFlip] = useState(false);
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [transactionType, setTransactionType] = useState("expense");
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactions);

	const handleTransactionTypeChange = (e) => {
		setTransactionType(e.target.value);
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
		<div className="container mx-auto px-5 h-full">
			{/* Header */}
			<div className="py-6 flex flex-row items-center justify-center gap-3 md:gap-52">
				<PiBank
					size={35}
					className="text-indigo-400 cursor-pointer mx-2"
					onClick={() => navigate("/accounts")}
				/>

				{/* Month search */}
				<Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />

				{/* Settings */}
				<IoSettingsOutline
					size={35}
					className="text-indigo-400 cursor-pointer mx-2"
					onClick={() => navigate("/settings")}
				/>
			</div>

			{/* Main Content */}
			<div className="w-88.25 md:w-[50%] mx-auto place-items-center">
				{loading || accountsLoading ? (
					// Skeleton for the card and categories/transactions
					<>
						<div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg mb-6"></div>
						<div className="flex gap-2 mb-4">
							<div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
							<div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
						</div>
						<div className="space-y-4">
							<div className="w-full h-20 bg-gray-300 animate-pulse rounded-lg"></div>
							<div className="w-full h-20 bg-gray-300 animate-pulse rounded-lg"></div>
							<div className="w-full h-20 bg-gray-300 animate-pulse rounded-lg"></div>
						</div>
					</>
				) : (
					<>
						<ReactCardFlip flipDirection="horizontal" isFlipped={flip}>
							<div className="cursor-pointer" onClick={flipCard}>
								<FinancialCard
									transactions={filteredTransactions}
									accounts={accounts}
								/>
							</div>

							<div className="cursor-pointer" onClick={flipCard}>
								<FinancialStats
									transactions={filteredTransactions}
									type={transactionType}
								/>
							</div>
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
							/>
						) : (
							<DisplayTransactions
								type={transactionType}
								transactions={filteredTransactions}
							/>
						)}
					</>
				)}
			</div>

			{/* Footer */}
			<Drawer
				views={{
					"New-transaction": <NewTransactionForms type={transactionType} />,
				}}
			/>
			<IoAddCircle
				size={70}
				className="text-indigo-400 cursor-pointer fixed bottom-4 right-4"
				onClick={() => setDrawerState("New-transaction")}
			/>
		</div>
	);
}
