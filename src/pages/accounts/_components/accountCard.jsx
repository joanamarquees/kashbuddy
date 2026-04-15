import { useState } from "react";
import { AccountForm } from "@/components/index";
import { useDeleteAccount } from "@/hooks/useDeleteAccount.js";
import { useUpdateAccount } from "@/hooks/useUpdateAccount.js";

export function AccountCard({ bankName, amount }) {
	const [isOpen, setIsOpen] = useState(false);
	const { updateAmount } = useUpdateAccount();
	const { deleteAccount } = useDeleteAccount();

	const [formData, setFormData] = useState({ bankName, amount });
	const [error, setError] = useState("");

	function closeModal() {
		setIsOpen(false);
		setError("");
	}

	async function handleUpdateAmount() {
		if (!formData.bankName || !formData.amount) {
			setError("Please fill in all fields");
			return;
		}

		await updateAmount({ bankName, amount: Number(parseFloat(formData.amount)) });
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

			<AccountForm
				isOpen={isOpen}
				onClose={closeModal}
				onSave={handleUpdateAmount}
				onDelete={handleDeleteAccount}
				formData={formData}
				setFormData={setFormData}
				isEdit={true}
				error={error}
				setError={setError}
			/>
		</>
	);
}
