import { X } from "lucide-react";
import { useId } from "react";
import { Button } from "../../../components/ui/Button.jsx";
import { Input } from "../../../components/ui/Input.jsx";

export const Modal = ({
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
		<div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8 sm:items-center sm:p-0">
			<button
				type="button"
				onClick={onClose}
				className="fixed bottom-0 left-0 h-full w-full bg-black/60 backdrop-blur-xs"
				aria-label="Close modal"
			/>

			{/* Modal Content */}
			<div className="relative my-auto w-full max-w-md bg-light-background rounded-4xl p-8 border border-white/10 shadow-2xl">
				<div className="flex flex-row items-center justify-between">
					<button
						type="button"
						onClick={onClose}
						className="p-2 bg-white/5 rounded-full text-muted-color active:scale-95 transition-all hover:text-white"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<h3 className="text-md font-extrabold mx-auto w-full text-center uppercase tracking-wide text-main-color mb-6">
					Edit Account
				</h3>

				<div className="space-y-6">
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
					<div className="space-y-2">
						<Button type="submit" onClick={onSave} variant="primary">
							Save Changes
						</Button>
						<Button variant="delete" onClick={onDelete} className="w-full">
							Delete Account
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
