import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { db } from "../../../config/firebase-config";

export function StatsCard({ transactions, type }) {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		const fetchCategories = async () => {
			const categoryData = {};

			for (const transaction of transactions) {
				const categoryId = transaction.categoryId;
				if (!categoryData[categoryId]) {
					const categoryDoc = await getDoc(doc(db, "categories", categoryId));
					categoryData[categoryId] = categoryDoc.data();
				}
			}
			setCategories(categoryData);
		};
		fetchCategories();
	}, [transactions]);

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

	// Format the data for Recharts (each object contains a category and total amount)
	const chartData = Object.keys(categoryTotals).map((categoryId) => ({
		category: categories[categoryId]?.label,
		amount: categoryTotals[categoryId],
		color: categories[categoryId]?.color || "#FFFFFF",
	}));

	return (
		<div
			className="bg-primary/20 backdrop-blur-lg border-2 border-primary/50
						rounded-xl mx-auto w-[90%] h-52 items-center justify-center flex flex-col space-y-8 shadow-lg"
		>
			{chartData.length === 0 ? (
				<div className="flex flex-col items-center space-y-4">
					<p className="text-5xl">🎉</p>
					<p className="text-center font-semibold uppercase text-zinc-100">
						You have no {type}s this month!
					</p>
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
								}}
								radius={10}
							>
								{chartData.map((entry) => (
									<Cell key={`cell-${entry}`} fill={entry.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}
