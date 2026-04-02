import { useState } from "react";
import { useDeleteAccount } from "../../../hooks/useDeleteAccount.js";
import { useUpdateAccount } from "../../../hooks/useUpdateAccount.js";
import { AccountModal } from "./accountModal.jsx";

export function AccountCard({ bankName, amount }) {
	const [isOpen, setIsOpen] = useState(false);
	const { updateAmount } = useUpdateAccount();
	const { deleteAccount } = useDeleteAccount();
	const [newAmount, setNewAmount] = useState(amount);

	function closeModal() {
		setIsOpen(false);
	}

	async function handleUpdateAmount() {
		await updateAmount({ bankName, amount: Math.round(newAmount) });
		closeModal();
	}

	async function handleDeleteAccount() {
		await deleteAccount({ bankName });
		closeModal();
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="bg-light-background border-2 border-primary/10 rounded-xl px-4 py-5 flex items-center justify-between shadow-md active:scale-95 transition-all"
			>
				<div className="flex flex-col">
					<span className="text-sm font-medium text-white">{bankName}</span>
				</div>
				<span className="text-lg font-bold text-white">{amount}€</span>
			</button>

			{isOpen && (
				<AccountModal
					isOpen={isOpen}
					onClose={closeModal}
					onSave={handleUpdateAmount}
					onDelete={handleDeleteAccount}
					bankName={bankName}
					amount={newAmount}
					onAmountChange={setNewAmount}
				/>
			)}
		</>
	);
}
