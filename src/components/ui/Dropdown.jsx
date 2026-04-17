import { ChevronDown } from "lucide-react";
import { useData } from "@/context/DataContext";
import { getCategoriesByType } from "@/utils/categories";
import { cn } from "@/utils/cn";

export function Dropdown({
	transactionData,
	setTransactionData,
	field,
	placeholder,
	label,
	value,
	onChange,
}) {
	const { categories, accounts } = useData();

	const handleChange = (e) => {
		const newValue = e.target.value;
		setTransactionData((prev) => ({ ...prev, [field]: newValue }));
		onChange?.(e);
	};

	// Build the options list first so we can validate the current value.
	// This handles stale IDs left over from deleted categories/accounts —
	// if the value doesn't match any live option we fall back to "default"
	// so the placeholder shows and the first real option can be selected.
	const options =
		field === "categoryId"
			? getCategoriesByType(categories, transactionData.transactionType)
			: accounts;

	const isValidValue = value && options.some((opt) => opt.id === value);
	const effectiveValue = isValidValue ? value : "default";
	const selected = !!isValidValue;

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
					className={cn(
						"w-full pl-4 py-4 text-sm appearance-none",
						selected ? "text-zinc-50" : "text-muted-color uppercase",
					)}
					onChange={handleChange}
					value={effectiveValue}
					required
				>
					<option value="default" disabled>
						{placeholder}
					</option>
					{options.map(({ id, label: optLabel, bankName }) => (
						<option key={id} value={id} className="text-zinc-50 bg-zinc-900">
							{optLabel ?? bankName}
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
