import daysjs from "dayjs";
import { useId } from "react";
import { TransactionSwitch } from "../../../components/TransactionSwitch.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Dropdown } from "../../../components/ui/Dropdown.jsx";
import { Input } from "../../../components/ui/Input.jsx";
import { Modal } from "../../../components/ui/Modal.jsx";

export const TransactionModal = ({
	isOpen,
	onClose,
	onSave,
	onDelete,
	transactionData,
	setTransactionData,
	category,
	account,
}) => {
	const descId = useId();
	const amountId = useId();
	const dateId = useId();

	const handleDateChange = (e) => {
		const dateString = e.target.value;
		const dateObject = new Date(dateString);
		setTransactionData({ ...transactionData, date: dateObject });
	};

	const handleTypeChange = (e) => {
		setTransactionData({ ...transactionData, transactionType: e.target.value });
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
			<TransactionSwitch
				type={transactionData.transactionType}
				handleChange={handleTypeChange}
			/>

			<Input
				id={descId}
				label="Description"
				placeholder="Transaction description..."
				value={transactionData.description}
				onChange={(e) =>
					setTransactionData({
						...transactionData,
						description: e.target.value,
					})
				}
			/>

			<div className="flex justify-between gap-4 w-full">
				<div className="flex-1">
					<Input
						id={amountId}
						label="Amount"
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
									"-",
								].includes(e.key)
							) {
								e.preventDefault();
							}
						}}
						placeholder="Transaction amount..."
						isMoneyInput
						value={transactionData.amount}
						onChange={(e) =>
							setTransactionData({
								...transactionData,
								amount: e.target.value.replace(",", "."),
							})
						}
					/>
				</div>
				<div className="flex-1">
					<Input
						id={dateId}
						label="Date"
						type="date"
						value={daysjs(transactionData.date).format("YYYY-MM-DD")}
						className={`w-full pr-3 ${!transactionData.date && "text-muted-color"}`}
						onChange={handleDateChange}
					/>
				</div>
			</div>

			<div className="flex justify-between gap-4 w-full mt-2">
				<Dropdown
					transactionData={transactionData}
					setTransactionData={setTransactionData}
					placeholder={category?.label || "Select Category"}
					field="categoryId"
					label="Category"
					value={transactionData.categoryId}
				/>
				<Dropdown
					transactionData={transactionData}
					setTransactionData={setTransactionData}
					placeholder={account?.bankName || "Select Account"}
					field="accountId"
					label="Account"
					value={transactionData.accountId}
				/>
			</div>

			{/* Action buttons */}
			<div className="space-y-4 pt-4">
				<Button type="button" onClick={onSave} variant="primary">
					Save Changes
				</Button>
				<Button
					type="button"
					variant="delete"
					onClick={onDelete}
					className="w-full"
				>
					Delete Transaction
				</Button>
			</div>
		</Modal>
	);
};
