import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
	AddButton,
	Button,
	CategoryForm,
	Header,
	LoadingScreen,
} from "@/components/index.js";
import { useAddCategory } from "@/hooks/useAddCategory.js";
import { useGetCategories } from "@/hooks/useGetCategories.js";
import { CategoryCard } from "./_components/CategoryCard.jsx";

const EMPTY_CATEGORY = {
	value: "",
	label: "",
	iconIndex: 5,
	color: "#ffffff",
	categoryType: "expense",
};

export function Categories() {
	const navigate = useNavigate();
	const { categories, loading } = useGetCategories();
	const { addCategory } = useAddCategory();

	const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
	const [newCategoryData, setNewCategoryData] = useState(EMPTY_CATEGORY);
	const [error, setError] = useState("");

	const handleOpenNewCategory = () => {
		setNewCategoryData(EMPTY_CATEGORY);
		setError("");
		setIsNewCategoryOpen(true);
	};

	const handleAddCategory = async () => {
		if (
			!newCategoryData.label ||
			!newCategoryData.color ||
			!newCategoryData.categoryType
		) {
			setError("Please fill in all fields");
			return;
		}
		await addCategory({
			value: newCategoryData.value,
			label: newCategoryData.label,
			iconIndex: newCategoryData.iconIndex,
			color: newCategoryData.color,
			categoryType: newCategoryData.categoryType,
		});
		setIsNewCategoryOpen(false);
	};

	return (
		<>
			<div className="container mx-auto px-4 h-full overflow-y-scroll pb-8 overscroll-contain">
				{/* Header */}
				<Header
					leftIcon={
						<IoIosArrowBack
							size={30}
							className="cursor-pointer"
							onClick={() => navigate("/settings")}
						/>
					}
					centerElement={
						<h1 className="text-xl font-bold font-sans mx-2 grow text-center text-muted-color uppercase">
							Categories
						</h1>
					}
					rightIcon={<div className="w-8" />}
				/>

				{/* Content */}
				{loading ? (
					<LoadingScreen />
				) : categories.length <= 0 ? (
					<div className="py-6 flex flex-col items-center justify-center gap-8 md:text-lg">
						<p className="text-muted-color leading-relaxed max-w-80 md:max-w-lg text-center font-sans">
							You haven't registered any category, how about registering one right
							now?
						</p>
						<Button onClick={handleOpenNewCategory} className="cursor-pointer">
							Add a category
						</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{categories.map((category) => {
							return (
								<CategoryCard
									key={category.id}
									category={category}
									allCategories={categories}
								/>
							);
						})}
					</div>
				)}
			</div>
			{categories.length > 0 && <AddButton onClick={handleOpenNewCategory} />}

			{/* Add Category Form */}
			<CategoryForm
				isOpen={isNewCategoryOpen}
				onClose={() => setIsNewCategoryOpen(false)}
				onSave={handleAddCategory}
				categoryData={newCategoryData}
				setCategoryData={setNewCategoryData}
				allCategories={categories}
				isEdit={false}
				error={error}
				setError={setError}
			/>
		</>
	);
}
