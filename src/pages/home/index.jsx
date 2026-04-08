import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { HiOutlineWallet } from "react-icons/hi2";
import { IoAdd, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // to change from login to home page
import {
	Calendar,
	Drawer,
	Header,
	LoadingScreen,
	NewTransactionForms,
	setDrawerState,
	TransactionSwitch,
} from "../../components/index.js";
// Hooks
import { useGetAccounts } from "../../hooks/useGetAccounts.js";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";

import { TotalBalanceCard } from "./_components/BalanceCard.jsx";
import { DisplayCategories } from "./_components/DisplayCategories.jsx";
import { DisplayTransactions } from "./_components/DisplayTransactions.jsx";
import { StatsCard } from "./_components/StatsCard.jsx";

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
		<div className="container mx-auto px-5 h-full overflow-y-scroll">
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

			<button
				type="button"
				onClick={() => setDrawerState("New-transaction")}
				className="fixed bottom-5 right-5 bg-primary/20 w-16 h-16 p-2 cursor-pointer flex items-center justify-center rounded-full active:scale-95 transition-all"
			>
				<IoAdd size={45} className="text-primary" />
			</button>
		</div>
	);
}
