/** biome-ignore-all lint/suspicious/noArrayIndexKey: index is used to distinguish chart bars */

import { BarChart3 } from "lucide-react";
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { useData } from "@/context/DataContext.jsx";

export function StatsCard({ transactions, type }) {
	const { categories: categoriesList } = useData();

	const categoryMap = categoriesList.reduce((acc, cat) => {
		acc[cat.id] = cat;
		return acc;
	}, {});

	// Calculate total amount for each category, grouping unknown/missing categories
	const categoryTotals = transactions.reduce((acc, transaction) => {
		if (transaction.transactionType !== type) {
			return acc;
		}

		// Use 'uncategorized' key if category doesn't exist
		const categoryId = categoryMap[transaction.categoryId]
			? transaction.categoryId
			: "uncategorized";

		if (!acc[categoryId]) {
			acc[categoryId] = 0;
		}
		acc[categoryId] += parseFloat(transaction.amount);
		return acc;
	}, {});

	// Format the data for Recharts
	const chartData = Object.keys(categoryTotals).map((categoryId) => {
		const category = categoryMap[categoryId];
		return {
			category: category?.value || "Uncategorized",
			amount: categoryTotals[categoryId],
			color: category?.color || "#94a3b8",
		};
	});

	const ghostData = [
		{ amount: 100, color: "var(--color-primary)" },
		{ amount: 150, color: "var(--color-primary)" },
		{ amount: 80, color: "var(--color-primary)" },
		{ amount: 120, color: "var(--color-primary)" },
		{ amount: 170, color: "var(--color-primary)" },
	];

	return (
		<div
			className="bg-card-surface border-2 border-primary/50 relative overflow-hidden
						rounded-xl mx-auto w-[90%] max-w-92 h-52 flex flex-col shadow-lg"
		>
			{chartData.length === 0 ? (
				<div className="relative w-full h-full flex flex-col items-center justify-center p-6">
					{/* Ghost Chart Background */}
					<div className="absolute inset-0 opacity-10 pointer-events-none p-4 pb-8">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={ghostData}>
								<Bar dataKey="amount" radius={[4, 4, 0, 0]}>
									{ghostData.map((entry, index) => (
										<Cell key={`ghost-${index}`} fill={entry.color} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Content Overlay */}
					<div className="relative z-10 flex flex-col items-center text-center space-y-3">
						<div className="p-3 bg-primary/10 rounded-full">
							<BarChart3 className="w-8 h-8 text-primary" />
						</div>
						<div className="space-y-1">
							<h3 className="text-zinc-100 font-semibold uppercase tracking-wider text-sm">
								No {type}s Tracked
							</h3>
							<p className="text-zinc-400 text-xs max-w-50 leading-relaxed">
								Your spending insights will appear here once you add
								transactions.
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="mx-auto w-full md:w-88.25 min-h-0 h-full py-1 items-center">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData} margin={{ bottom: 20 }}>
							<XAxis hide />
							<YAxis hide />
							<Bar
								dataKey="amount"
								label={{
									position: "bottom",
									fill: "#BABABA",
									fontSize: 12,
								}}
								radius={10}
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}
