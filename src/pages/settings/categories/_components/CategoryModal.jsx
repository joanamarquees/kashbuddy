import { useId } from "react";
import {
	Button,
	ColorPicker,
	IconPicker,
	Input,
	Modal,
} from "../../../../components/index.js";

import { iconList } from "../../../../utils/categories.js";

export const CategoryModal = ({
	isOpen,
	onClose,
	onSave,
	onDelete,
	categoryData,
	setCategoryData,
	allCategories,
}) => {
	const nameId = useId();

	const Icon = iconList[categoryData?.iconIndex];

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Edit Category">
			<div className="flex flex-col gap-6 w-full">
				{/* Display chosen Icon with respective Color */}
				<div className="flex flex-row items-center justify-center">
					{Icon && <Icon size={45} style={{ color: categoryData?.color }} />}
				</div>

				{/* Category Name Input */}
				<Input
					id={nameId}
					label="Category Name"
					placeholder={categoryData?.value || "Category Name"}
					value={categoryData?.value || ""}
					onChange={(e) =>
						setCategoryData({
							...categoryData,
							value: e.target.value,
							label: e.target.value,
						})
					}
				/>

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
			</div>

			{/* Action buttons */}
			<div className="flex flex-row w-full space-x-4 pt-4 mt-2">
				<Button
					type="button"
					variant="delete"
					onClick={onDelete}
					className="w-full"
				>
					Delete Category
				</Button>
				<Button type="button" onClick={onSave} variant="primary">
					Save Changes
				</Button>
			</div>
		</Modal>
	);
};
