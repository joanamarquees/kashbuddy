import { IoMdArrowRoundBack } from "react-icons/io";
import { calculateNetworth } from "../../../utils/networth.js";

export const TotalBalanceCard = ({ transactions, accounts }) => {
	const { totalNetworth, totalExpenses, totalIncomes } = calculateNetworth(
		accounts,
		transactions,
	);

	return (
		<div
			className="bg-primary/20 backdrop-blur-lg border-2 border-primary/50
			rounded-xl mx-auto w-[90%] h-52 items-center justify-center flex flex-col space-y-8 shadow-lg"
		>
			{/* Card Title */}
			<div className="flex flex-col items-center">
				<h2 className="text-zinc-400 text-center uppercase tracking-wider font-bold text-xs font-sans">
					Total Balance
				</h2>
				<span className="flex items-end justify-center text-main-color text-center font-extrabold text-5xl md:text-6xl font-sans">
					{totalNetworth}
					<p className="text-muted-color font-medium text-3xl ml-1">€</p>
				</span>
			</div>

			{/* Income and Expenses Section */}
			<div className="w-full flex justify-center items-center space-x-12 md:space-x-20">
				{/* Expenses Section */}
				<div className="flex items-center space-x-2">
					{/* Circle Icon */}
					<div className="w-8 h-8 bg-white/20 rounded-full flex justify-center items-center">
						<IoMdArrowRoundBack
							size={20}
							className="text-red-400 translate rotate-135"
						/>
					</div>

					{/* Expenses Text */}
					<div className="flex flex-col items-start">
						<p className="text-muted-color text-xs font-semibold uppercase">
							Expenses
						</p>
						<p className="text-white text-md font-extrabold">
							-{totalExpenses} €
						</p>
					</div>
				</div>

				{/* Income Section */}
				<div className="flex items-center space-x-2">
					{/* Circle Icon */}
					<div className="w-8 h-8 bg-white/20 rounded-full flex justify-center items-center">
						<IoMdArrowRoundBack
							size={20}
							className="text-green-400 translate -rotate-135"
						/>
					</div>
					{/* Income Text */}
					<div className="flex flex-col items-start">
						<p className="text-muted-color text-xs font-semibold uppercase">
							Income
						</p>
						<p className="text-white text-md font-extrabold">
							+{totalIncomes} €
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
