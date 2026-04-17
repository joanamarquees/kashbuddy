import daysjs from "dayjs";
import { useId } from "react";
import {
	BottomSheet,
	Button,
	Dropdown,
	Input,
	Modal,
	TransactionSwitch,
} from "@/components/index";
import { useMediaQuery } from "@/hooks/useMediaQuery.js";
import { cn } from "@/utils/cn";

export function TransactionForm({
	isOpen,
	onClose,
	onSave,
	onDelete,
	transactionData,
	setTransactionData,
	category,
	account,
	isEdit = false,
	error,
	setError,
}) {
	const descId = useId();
	const amountId = useId();
	const dateId = useId();
	const isDesktop = useMediaQuery("(min-width: 450px)");

	const handleDateChange = (e) => {
		const dateObject = new Date(e.target.value);
		setTransactionData({ ...transactionData, date: dateObject });
	};

	const handleTypeChange = (e) => {
		setTransactionData({
			...transactionData,
			transactionType: e.target.value,
		});
	};

	const getDateValue = () => {
		if (!transactionData.date) return "";
		try {
			return daysjs(transactionData.date).format("YYYY-MM-DD");
		} catch {
			return transactionData.date instanceof Date
				? transactionData.date.toISOString().split("T")[0]
				: "";
		}
	};

	const content = (
		<div className="flex flex-col space-y-5">
			<TransactionSwitch
				type={transactionData.transactionType}
				handleChange={(e) => {
					handleTypeChange(e);
					setError?.("");
				}}
			/>

			<Input
				id={descId}
				label="Description"
				placeholder="Transaction description..."
				value={transactionData.description}
				onChange={(e) => {
					setTransactionData({
						...transactionData,
						description: e.target.value,
					});
					setError?.("");
				}}
			/>

			<div className="flex justify-between gap-4 w-full">
				<div className="w-1/2">
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
						onChange={(e) => {
							setTransactionData({
								...transactionData,
								amount: e.target.value.replace(",", "."),
							});
							setError?.("");
						}}
					/>
				</div>
				<div className="w-1/2">
					<Input
						id={dateId}
						label="Date"
						type="date"
						value={getDateValue()}
						className={cn("pr-3", !transactionData.date && "text-muted-color")}
						onChange={(e) => {
							handleDateChange(e);
							setError?.("");
						}}
					/>
				</div>
			</div>

			<div className="flex justify-between gap-4 w-full">
				<Dropdown
					transactionData={transactionData}
					setTransactionData={setTransactionData}
					placeholder={category?.label || "Category"}
					field="categoryId"
					label="Category"
					value={transactionData.categoryId}
					onChange={() => setError?.("")}
				/>
				<Dropdown
					transactionData={transactionData}
					setTransactionData={setTransactionData}
					placeholder={account?.bankName || "Account"}
					field="accountId"
					label="Account"
					value={transactionData.accountId}
					onChange={() => setError?.("")}
				/>
			</div>

			<div className="pt-2 flex flex-col gap-3">
				<div
					className={cn(
						"grid transition-all duration-300 ease-in-out",
						error ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
					)}
				>
					<div className="overflow-hidden">
						<p className="text-red-400 text-[10px] font-bold uppercase text-center tracking-widest py-1">
							{error}
						</p>
					</div>
				</div>

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
							Delete Transaction
						</Button>
					</>
				) : (
					<>
						<Button
							variant={
								!transactionData.description ||
								!transactionData.amount ||
								!transactionData.categoryId ||
								!transactionData.accountId
									? "secondary"
									: "primary"
							}
							onClick={onSave}
						>
							Add Transaction
						</Button>
						<Button variant="delete" onClick={onClose}>
							Cancel
						</Button>
					</>
				)}
			</div>
		</div>
	);

	const title = isEdit ? "Edit Transaction" : "Add Transaction";

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
