import {
	AddTransactionCard,
	Drawer,
	NewTransactionForms,
	setDrawerState,
} from "../../../components/index.js";
import { useData } from "../../../context/DataContext.jsx";

export function DisplayCategories({ type, transactions }) {
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
	}));

	if (chartData.length === 0) {
		return (
			<>
				<Drawer
					views={{ "New-transaction": <NewTransactionForms type={type} /> }}
				/>
				<AddTransactionCard
					transactionType={type}
					onClick={() => setDrawerState("New-transaction")}
					text={`You don’t have any ${type} this month. Tap to add one.`}
				/>
			</>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-2">
			{chartData.map(({ category, amount, color }) => (
				<div
					key={category}
					className="container col-span-1 rounded-xl h-24 flex flex-col align-middle pt-5"
					style={{ backgroundColor: color }}
				>
					<p className="text-zinc-950 font-medium text-xl mx-auto content-center">
						{category}
					</p>
					<p className="text-zinc-950 font-bold text-sm mx-auto content-center">
						{amount}€
					</p>
				</div>
			))}
		</div>
	);
}
