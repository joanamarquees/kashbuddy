import { IoIosArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import {
	Button,
	Drawer,
	Header,
	LoadingScreen,
	NewCategoryForms,
	setDrawerState,
} from "../../../components/index.js";
import { useGetCategories } from "../../../hooks/useGetCategories.js";
import { CategoryCard } from "./_components/CategoryCard.jsx";

export function Categories() {
	const navigate = useNavigate();
	const { categories, loading } = useGetCategories();

	return (
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
				rightIcon={<div className="w-8"></div>}
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
					<Button
						onClick={() => setDrawerState("New-category")}
						className="cursor-pointer"
					>
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

					{/* Add category button */}
					<button
						type="button"
						onClick={() => setDrawerState("New-category")}
						className="fixed bottom-5 right-5 bg-primary/20 w-16 h-16 p-2 cursor-pointer flex items-center justify-center rounded-full active:scale-95 transition-all"
					>
						<IoAdd size={45} className="text-primary" />
					</button>
				</div>
			)}

			<Drawer
				views={{
					"New-category": <NewCategoryForms allCategories={categories} />,
				}}
			/>
		</div>
	);
}
