import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useData } from "../../context/DataContext";
import { getCategoriesByType } from "../../utils/categories";

export function Dropdown({
	transactionData,
	setTransactionData,
	field,
	placeholder,
	label,
	value,
}) {
	const { categories, accounts } = useData();
	const [selected, setSelected] = useState(!!value);

	const handleChange = (e) => {
		setTransactionData({ ...transactionData, [field]: e.target.value });
		setSelected(true);
	};

	return (
		<div className="space-y-2 w-1/2">
			<label
				htmlFor={field}
				className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2"
			>
				{label}
			</label>
			<div className="flex flex-row bg-black/20 border border-white/5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer rounded-2xl items-center justify-between">
				<select
					id={field}
					className={twMerge(
						"w-full pl-4 py-4 text-sm appearance-none",
						selected ? "text-zinc-50" : "text-muted-color uppercase",
					)}
					onChange={handleChange}
					value={value ?? "default"}
					required
				>
					<option value="default" disabled>
						{placeholder}
					</option>
					{field === "categoryId"
						? getCategoriesByType(
								categories,
								transactionData.transactionType,
							).map(({ id, label }) => (
								<option
									key={id}
									value={id}
									className="text-zinc-50 bg-zinc-900"
								>
									{label}
								</option>
							))
						: accounts.map(({ id, bankName }) => (
								<option
									key={id}
									value={id}
									className="text-zinc-50 bg-zinc-900"
								>
									{bankName}
								</option>
							))}
				</select>
				{/* Custom chevron icon */}
				<span className="text-gray-500 pointer-events-none px-3.5">
					<ChevronDown size={20} />
				</span>
			</div>
		</div>
	);
}
