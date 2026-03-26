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
import { db } from "../config/firebase-config";

export function FinancialStats({ transactions, type }) {
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

	// If there is no data, display a message
	if (chartData.length === 0) {
		return (
			<div className="relative mx-auto w-full md:w-[353px] h-60 mb-5 items-center">
				{/* Background Layer 1 */}
				<div className="absolute w-[90%] h-[208px] bottom-0 right-4 bg-slate-400 rounded-[22px]"></div>

				{/* Background Layer 2 */}
				<div className="absolute w-[95%] h-[208px] top-0 right-2 bg-slate-700 rounded-[22px]"></div>

				{/* Content */}
				<div className="absolute flex flex-col space-y-5 mx-auto w-full md:w-[353px] h-[208px] items-center justify-center">
					<p className="text-5xl">🎉</p>
					<p className="text-center font-semibold uppercase text-zinc-100">
						{" "}
						You have no {type}s this month!{" "}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="relative mx-auto w-full md:w-[353px] h-60 mb-5 items-center">
			{/* Background Layer 1 */}
			<div className="absolute w-[90%] h-[208px] bottom-0 right-4 bg-slate-400 rounded-[22px]" />

			{/* Background Layer 2 */}
			<div className="absolute w-[95%] h-[208px] top-0 right-2 bg-slate-700 rounded-[22px]">
				{/* Content */}
				<div className="relative mx-auto w-full md:w-[353px] h-full py-3 items-center">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData} margin={{ top: 20 }}>
							<XAxis hide />
							<YAxis hide />
							<Bar dataKey="amount" label={{ position: "top" }} radius={10}>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
