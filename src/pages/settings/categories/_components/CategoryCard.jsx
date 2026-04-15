import { useState } from "react";
import { CategoryForm } from "@/components/forms/CategoryForm.jsx";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";
import { useUpdateCategory } from "@/hooks/useUpdateCategory";
import { iconList } from "@/utils/categories";

export function CategoryCard({ category, allCategories }) {
	const { id } = category;
	const { updateCategory } = useUpdateCategory();
	const { deleteCategory } = useDeleteCategory();
	const [isOpen, setIsOpen] = useState(false);
	const [categoryData, setCategoryData] = useState(category);
	const [error, setError] = useState("");

	function closeModal() {
		setIsOpen(false);
		setError("");
	}

	function openModal() {
		setIsOpen(true);
	}

	async function handleDeleteCategory() {
		await deleteCategory({ id });
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
		</>
	);
}
