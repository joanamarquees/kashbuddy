import { AddTransactionCard } from "@/components/index.js";
import { useData } from "@/context/DataContext.jsx";
import { iconList } from "@/utils/categories.js";

export function DisplayCategories({ type, transactions, onAddClick }) {
	const { categories } = useData();

	const categoryMap = categories.reduce((acc, cat) => {
		acc[cat.id] = cat;
		return acc;
	}, {});

	// Calculate total amount for each category
	const categoryTotals = transactions.reduce((acc, transaction) => {
		if (transaction.transactionType !== type) {
			return acc;
		}
		const categoryId = transaction.categoryId;
		if (!acc[categoryId]) {
			acc[categoryId] = 0;
		}
		acc[categoryId] += parseFloat(transaction.amount);
		return acc;
	}, {});

	const chartData = Object.keys(categoryTotals).map((categoryId) => ({
		category: categoryMap[categoryId]?.value,
		amount: categoryTotals[categoryId],
		color: categoryMap[categoryId]?.color || "#FFFFFF",
		iconIndex: categoryMap[categoryId]?.iconIndex,
	}));

	if (chartData.length === 0) {
		return (
			<AddTransactionCard
				transactionType={type}
				onClick={onAddClick}
				text={`Categorize your ${type}s to see detailed insights. Tap to add your first transaction!`}
			/>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			{chartData.map((cat) => {
				return (
					<div
						key={cat.category}
						className="bg-light-background border-2 border-primary/10 p-4 rounded-2xl relative overflow-hidden group transition-all hover:border-white/10"
						style={{
							borderColor: `${cat.color}`,
						}}
					>
						<div className="relative z-10 space-y-3 flex justify-start items-center space-x-2">
							<div className="space-y-3">
								<p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
									{cat.category}
								</p>
								<p className="text-xl font-bold text-white tracking-tight leading-none">
									{cat.amount}€
								</p>
							</div>
						</div>
						<div
							className="absolute bottom-1 right-1 w-14 h-14 flex items-center justify-center opacity-30"
							style={{ color: `${cat.color}` }}
						>
							{cat.iconIndex !== undefined && iconList[cat.iconIndex] ? (
								(() => {
									const Icon = iconList[cat.iconIndex];
									return <Icon size={35} />;
								})()
							) : (
								<p className="text-lg font-bold">{cat.category?.[0]}</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
