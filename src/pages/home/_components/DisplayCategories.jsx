import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
	AddTransactionCard,
	Drawer,
	NewTransactionForms,
	setDrawerState,
} from "../../../components/index.js";
import { db } from "../../../config/firebase-config.js";

export function DisplayCategories({ type, transactions }) {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		const fetchCategories = async () => {
			const categoryData = {};

			for (const transaction of transactions) {
				if (transaction.transactionType !== type) {
					continue;
				}

				const categoryId = transaction.categoryId;
				if (!categoryData[categoryId]) {
					const categoryDoc = await getDoc(doc(db, "categories", categoryId));
					categoryData[categoryId] = categoryDoc.data();
				}
			}
			setCategories(categoryData);
		};
		fetchCategories();
	}, [transactions, type]);

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
		category: categories[categoryId]?.value,
		amount: categoryTotals[categoryId],
		color: categories[categoryId]?.color || "#FFFFFF",
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
