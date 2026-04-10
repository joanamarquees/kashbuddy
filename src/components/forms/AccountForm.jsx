/** biome-ignore-all lint/correctness/useUniqueElementIds: input id here is to identify the input purpose */
import { BottomSheet } from "@/components/ui/BottomSheet.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { Modal } from "@/components/ui/Modal.jsx";
import { useMediaQuery } from "@/hooks/useMediaQuery.js";

export function AccountForm({
	isOpen,
	onClose,
	onSave,
	onDelete,
	formData,
	setFormData,
	isEdit = false,
}) {
	const isDesktop = useMediaQuery("(min-width: 450px)");

	const handleAmountKeyDown = (e) => {
		if (
			!/[\d.,]/.test(e.key) &&
			!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
		) {
			e.preventDefault();
		}
	};

	const content = (
		<div className="flex flex-col gap-5">
			<Input
				id="bankName"
				label="Account Name"
				placeholder="Insert your bank name..."
				value={formData.bankName}
				disabled={isEdit}
				onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
			/>

			<Input
				id="amount"
				label="Balance"
				inputMode="decimal"
				onKeyDown={handleAmountKeyDown}
				placeholder="Insert your bank networth..."
				isMoneyInput
				value={formData.amount}
				onChange={(e) =>
					setFormData({
						...formData,
						amount: e.target.value.replace(",", "."),
					})
				}
			/>

			<div className="pt-2 flex flex-col space-y-3">
				{isEdit ? (
					<>
						<Button type="button" onClick={onSave} variant="primary">
							Save Changes
						</Button>
						<Button
							type="button"
							variant="delete"
							onClick={onDelete}
							className="w-full"
						>
							Delete Account
						</Button>
					</>
				) : (
					<>
						<Button
							onClick={onSave}
							disabled={!formData.bankName || !formData.amount}
							variant={
								!formData.bankName || !formData.amount ? "secondary" : "primary"
							}
						>
							Add Account
						</Button>
						<Button variant="delete" onClick={onClose}>
							Cancel
						</Button>
					</>
				)}
			</div>
		</div>
	);

	const title = isEdit ? "Edit Account" : "Add Account";

	if (isDesktop) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} title={title}>
				{content}
			</Modal>
		);
	}

	return (
		<BottomSheet open={isOpen} onClose={onClose} title={title}>
			{content}
		</BottomSheet>
	);
}
