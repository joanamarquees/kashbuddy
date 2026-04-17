import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { CategoryForm } from "@/components/forms/CategoryForm.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";
import { useUpdateCategory } from "@/hooks/useUpdateCategory";
import { iconList } from "@/utils/categories";

export function CategoryCard({ category, allCategories, isUsed }) {
	const { id } = category;
	const { updateCategory } = useUpdateCategory();
	const { deleteCategory } = useDeleteCategory();
	const [isOpen, setIsOpen] = useState(false);
	const [categoryData, setCategoryData] = useState(category);
	const [error, setError] = useState("");
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
		setError("");
	}

	function openModal() {
		setIsOpen(true);
	}

	async function handleDeleteCategory() {
		if (isUsed && !isConfirmOpen) {
			// Close the edit form first, then open the confirmation dialog
			setIsOpen(false);
			setIsConfirmOpen(true);
			return;
		}
		await deleteCategory({ id });
		setIsConfirmOpen(false);
		closeModal();
	}

	async function handleUpdateCategory() {
		if (
			!categoryData.label ||
			!categoryData.color ||
			!categoryData.categoryType
		) {
			setError("Please fill in all fields");
			return;
		}

		await updateCategory({
			...categoryData,
		});
		closeModal();
	}

	const Icon = iconList[categoryData?.iconIndex];

	return (
		<>
			<button
				type="button"
				onClick={() => openModal()}
				className="bg-light-background border-2 space-x-4 border-primary/10 rounded-xl w-full p-5 flex items-center justify-start group hover:border-[#818cf8]/30 transition-all active:scale-[0.98]"
			>
				{Icon && (
					<Icon
						style={{
							color: category.color,
						}}
						className="w-8 h-8"
					/>
				)}
				<p className="font-bold text-sm tracking-tight text-left">
					{category.value}
				</p>
			</button>

			<CategoryForm
				isOpen={isOpen}
				onClose={closeModal}
				onSave={handleUpdateCategory}
				onDelete={handleDeleteCategory}
				categoryData={categoryData}
				setCategoryData={setCategoryData}
				allCategories={allCategories}
				isEdit={true}
				error={error}
				setError={setError}
			/>

			{/* Confirmation Modal */}
			{isConfirmOpen && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center px-5">
					{/* Backdrop */}
					<button
						type="button"
						onClick={() => setIsConfirmOpen(false)}
						className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-default"
						aria-label="Close confirmation"
					/>

					{/* Dialog */}
					<div className="relative w-full max-w-sm bg-light-background rounded-3xl p-7 border border-white/10 shadow-2xl flex flex-col gap-5">
						{/* Icon */}
						<div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 mx-auto">
							<AlertTriangle className="w-7 h-7 text-amber-400" />
						</div>

						{/* Text */}
						<div className="text-center space-y-2">
							<h3 className="text-base font-extrabold uppercase tracking-wide text-white">
								Delete Category?
							</h3>
							<p className="text-sm text-muted-color leading-relaxed">
								This category is linked to some of your transactions. If you
								delete it, those transactions will appear as{" "}
								<span className="text-white font-semibold">uncategorized</span>.
								Are you sure you want to continue?
							</p>
						</div>

						{/* Actions */}
						<div className="flex flex-col gap-3 pt-1">
							<Button
								type="button"
								variant="delete"
								onClick={handleDeleteCategory}
								className="w-full"
							>
								Yes, delete it
							</Button>
							<Button
								type="button"
								variant="secondary"
								onClick={() => setIsConfirmOpen(false)}
								className="w-full"
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
