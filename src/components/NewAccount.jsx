/** biome-ignore-all lint/correctness/useUniqueElementIds: in this case, id is being used to connect with a given label */
import { useState } from "react";
import { useAddAccount } from "../hooks/useAddAccounts.js";
import { Button } from "./ui/Button.jsx";
import { setDrawerState } from "./ui/Drawer.jsx";
import { Input } from "./ui/Input.jsx";

export function NewAccountForms() {
	const { addAccount } = useAddAccount();
	const [accountData, setAccountData] = useState({
		bankName: "",
		amount: "",
	});
	const [error, setError] = useState("");
	const isFormEmpty = !accountData.bankName || !accountData.amount;

	const handleAddAccount = async () => {
		if (!accountData.bankName || !accountData.amount) {
			setError("Please fill in all fields");
			return;
		}

		await addAccount({
			bankName: accountData.bankName,
			amount: Number(parseFloat(accountData.amount)),
		});

		setDrawerState(null);
	};

	return (
		<div className="mx-auto px-5 align-middle flex flex-col justify-center align-center space-y-4 pt-5">
			<h1 className="text-md font-extrabold mx-auto w-full text-center uppercase tracking-wide text-main-color mb-6">
				Add a new account
			</h1>

			<Input
				id="bankName"
				label="Bank Name"
				placeholder="Insert your bank name..."
				value={accountData.bankName}
				onChange={(e) =>
					setAccountData({ ...accountData, bankName: e.target.value })
				}
			/>

			<Input
				id="amount"
				label="Initial Balance"
				inputMode="decimal"
				onKeyDown={(e) => {
					if (
						!/[\d.,]/.test(e.key) &&
						!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
							e.key,
						)
					) {
						e.preventDefault();
					}
				}}
				placeholder="Insert your bank networth..."
				isMoneyInput
				value={accountData.amount}
				onChange={(e) =>
					setAccountData({
						...accountData,
						amount: e.target.value.replace(",", "."),
					})
				}
			/>

			<div className="my-4 flex justify-center">
				<Button
					onClick={handleAddAccount}
					variant={isFormEmpty ? "secondary" : "primary"}
					disabled={isFormEmpty}
				>
					Save
				</Button>
			</div>
			{error && <p className="text-red-500 text-center text-xs">{error}</p>}
		</div>
	);
}
