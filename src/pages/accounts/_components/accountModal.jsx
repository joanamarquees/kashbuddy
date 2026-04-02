import { useId } from "react";
import { Button } from "../../../components/ui/Button.jsx";
import { Input } from "../../../components/ui/Input.jsx";
import { Modal } from "../../../components/ui/Modal.jsx";

export const AccountModal = ({
	isOpen,
	onClose,
	onSave,
	onDelete,
	bankName,
	amount,
	onAmountChange,
}) => {
	const accountNameId = useId();
	const initialBalanceId = useId();

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Edit Account">
			<Input
				id={accountNameId}
				label="Account Name"
				placeholder={bankName}
				disabled
			/>

			<Input
				id={initialBalanceId}
				label="Initial Balance"
				inputMode="decimal"
				onKeyDown={(e) => {
					if (
						!/[\d.,]/.test(e.key) &&
						![
							"Backspace",
							"Delete",
							"ArrowLeft",
							"ArrowRight",
							"Tab",
						].includes(e.key)
					) {
						e.preventDefault();
					}
				}}
				placeholder="Insert your bank networth..."
				isMoneyInput
				value={amount}
				onChange={(e) => onAmountChange(e.target.value.replace(",", "."))}
			/>

			{/* Action buttons */}
			<div className="space-y-4">
				<Button type="button" onClick={onSave} variant="primary">
					Save Changes
				</Button>
				<Button type="button" variant="delete" onClick={onDelete} className="w-full">
					Delete Account
				</Button>
			</div>
		</Modal>
	);
};
