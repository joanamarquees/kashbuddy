import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { HiOutlineWallet } from "react-icons/hi2";
import { IoAddCircle, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // to change from login to home page
import { DisplayCategories } from "../../components/DisplayCategories.jsx";
import { DisplayTransactions } from "../../components/DisplayTransactions.jsx";
import { Header } from "../../components/Header.jsx";
import { LoadingScreen } from "../../components/LoadingScreen.jsx";
import { NewTransactionForms } from "../../components/NewTransaction.jsx";
import { TransactionSwitch } from "../../components/TransactionSwitch.jsx";
import { Calendar } from "../../components/ui/Calendar.jsx";
import { Drawer, setDrawerState } from "../../components/ui/Drawer.jsx";
import { useGetAccounts } from "../../hooks/useGetAccounts.js";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import { FinancialCard } from "./_components/BalanceCard.jsx";
import { FinancialStats } from "./_components/FinancialStatsCard.jsx";

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
			<div className="h-full w-full md:w-[50%] mx-auto place-items-center space-y-8">
				{loading || accountsLoading ? (
					<LoadingScreen />
				) : (
					<>
						<ReactCardFlip flipDirection="horizontal" isFlipped={flip}>
							<button
								type="button"
								className="w-full cursor-pointer"
								onClick={flipCard}
							>
								<FinancialCard
									transactions={filteredTransactions}
									accounts={accounts}
								/>
							</button>

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
				className="text-indigo-400 cursor-pointer fixed bottom-5 right-5"
				onClick={() => setDrawerState("New-transaction")}
			/>
		</div>
	);
}
