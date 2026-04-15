import { useEffect, useId, useState } from "react";
import {
	BottomSheet,
	Button,
	ColorPicker,
	IconPicker,
	Input,
	Modal,
	TransactionSwitch,
} from "@/components/index";
import { useMediaQuery } from "@/hooks/useMediaQuery.js";
import { iconList } from "@/utils/categories.js";
import { cn } from "@/utils/cn";

export function CategoryForm({
	isOpen,
	onClose,
	onSave,
	onDelete,
	categoryData,
	setCategoryData,
	allCategories,
	isEdit = false,
	error,
	setError,
}) {
	const nameId = useId();
	const isDesktop = useMediaQuery("(min-width: 450px)");
	const [showPickers, setShowPickers] = useState(false);

	// Reset showPickers when the form is closed
	useEffect(() => {
		if (!isOpen) {
			setShowPickers(false);
		}
	}, [isOpen]);

	const Icon = iconList[categoryData?.iconIndex];

	const content = (
		<div className="flex flex-col gap-5">
			{isDesktop && showPickers ? (
				/* PICKER VIEW (Modal Only) */
				<>
					{/* Icon Picker on top */}
					<div className="space-y-2">
						<p className="ml-2 font-medium text-sm text-white">Icon</p>
						<IconPicker
							categoryData={categoryData}
							setCategoryData={setCategoryData}
						/>
					</div>

					{/* Color Picker below */}
					<div className="space-y-2">
						<p className="ml-2 font-medium text-sm text-white">Color</p>
						<ColorPicker
							categoryData={categoryData}
							setCategoryData={setCategoryData}
							allCategories={allCategories}
						/>
					</div>

					{/* Done Button */}
					<div className="pt-2">
						<Button
							type="button"
							onClick={() => setShowPickers(false)}
							variant="primary"
							className="w-full"
						>
							Done
						</Button>
					</div>
				</>
			) : (
				/* MAIN VIEW (Standard or Desktop Main) */
				<>
					{/* Icon preview section */}
					<div className="flex flex-col items-center justify-center gap-1">
						<button
							type="button"
							className={cn(
								"flex items-center justify-center",
								isDesktop ? "cursor-pointer" : "",
							)}
							onClick={isDesktop ? () => setShowPickers(true) : undefined}
						>
							{Icon && (
								<Icon size={45} style={{ color: categoryData?.color }} />
							)}
						</button>
						{isDesktop && (
							<button
								type="button"
								onClick={() => setShowPickers(true)}
								className="text-[10px] font-semibold text-muted-color cursor-pointer uppercase tracking-wider mb-1"
							>
								edit icon
							</button>
						)}
					</div>

					{/* Category Name Input */}
					<Input
						id={nameId}
						label="Category Name"
						placeholder={categoryData?.value || "Category Name"}
						value={categoryData?.value || ""}
						onChange={(e) => {
							setCategoryData({
								...categoryData,
								value: e.target.value,
								label: e.target.value,
							});
							setError?.("");
						}}
					/>

					{/* Category Type Switch */}
					{!isEdit && (
						<TransactionSwitch
							type={categoryData?.categoryType}
							handleChange={(e) => {
								setCategoryData({
									...categoryData,
									categoryType: e.target.value,
								});
								setError?.("");
							}}
						/>
					)}

					{/* Pickers (Only visible on Mobile view) */}
					{!isDesktop && (
						<>
							<div className="space-y-2">
								<p className="ml-2 font-medium text-sm text-white">Color</p>
								<ColorPicker
									categoryData={categoryData}
									setCategoryData={setCategoryData}
									allCategories={allCategories}
								/>
							</div>

							<div className="space-y-2">
								<p className="ml-2 font-medium text-sm text-white">Icon</p>
								<IconPicker
									categoryData={categoryData}
									setCategoryData={setCategoryData}
								/>
							</div>
						</>
					)}

					{/* Action Buttons */}
					<div className="pt-2 flex flex-col gap-3">
						<div
							className={cn(
								"overflow-hidden transition-all duration-300 ease-in-out",
								error ? "max-h-10 opacity-100" : "max-h-0",
							)}
						>
							<p className="text-red-400 text-[10px] font-bold uppercase text-center tracking-widest h-5">
								{error}
							</p>
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
									Delete Category
								</Button>
							</>
						) : (
							<>
								<Button
									variant={!categoryData.value ? "secondary" : "primary"}
									onClick={onSave}
								>
									Add Category
								</Button>
								<Button variant="delete" onClick={onClose}>
									Cancel
								</Button>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);

	const title = isEdit ? "Edit Category" : "Add Category";

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
