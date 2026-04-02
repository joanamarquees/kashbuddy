import { BsCashCoin } from "react-icons/bs";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

export const TransactionSwitch = ({ type, handleChange }) => {
	return (
		<div className="relative w-full h-12 bg-light-background/50 border-2 border-primary/10 rounded-xl flex items-center justify-between p-0.5">
			{/* Radio buttons */}
			<div className="grid grid-cols-2 w-full items-center justify-center z-5">
				<label className="flex items-center cursor-pointer justify-center">
					<input
						type="radio"
						name="transactionType"
						value="expense"
						onChange={handleChange}
						defaultChecked={type === "expense"}
						className="hidden"
					/>
					<span className="text-center w-full flex items-center justify-center gap-2 m-0.5">
						<MdOutlineLocalGroceryStore size={20} />
						<p className="text-sm font-medium tracking-wide uppercase">
							Expenses
						</p>
					</span>
				</label>

				<label className="flex items-center cursor-pointer">
					<input
						type="radio"
						name="transactionType"
						value="income"
						onChange={handleChange}
						defaultChecked={type === "income"}
						className="hidden"
					/>
					<span className="text-center w-full flex items-center justify-center gap-2 m-0.5">
						<BsCashCoin size={18} />
						<p className="text-sm font-medium tracking-wide uppercase">
							Income
						</p>
					</span>
				</label>
			</div>

			{/* Slider for active tab */}
			<div
				className={`absolute w-[calc(50%-0.125rem)] h-[calc(98%-0.125rem)] bg-indigo-400 shadow-sm rounded-[10px] transition-all duration-300 ease-in-out z-0 ${
					type === "income" ? "translate-x-full" : ""
				}`}
			/>
		</div>
	);
};
