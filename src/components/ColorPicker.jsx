import { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";

export function ColorPicker({ categoryData, setCategoryData, allCategories }) {
	const inputRef = useRef(null);
	const [colors, setColors] = useState([]);

	const currentColor = categoryData?.color || "#ffffff";

	useEffect(() => {
		if (allCategories) {
			const uniqueColors = [
				...new Set(allCategories.map((category) => category.color)),
			];
			setColors(uniqueColors);
		}
	}, [allCategories]);

	const handleColorChange = (e) => {
		setCategoryData({ ...categoryData, color: e.target.value });
	};

	return (
		<div className="flex flex-row overflow-x-auto overflow-hidden max-w-76 md:max-w-sm">
			<div className="flex gap-3 ml-1">
				{/* Color Picker Input */}
				<div className="flex-col text-center space-y-1 max-w-full">
					<div className="w-8 h-8 relative flex align-middle mx-auto">
						<input
							ref={inputRef}
							type="color"
							value={currentColor}
							onChange={handleColorChange}
							className="appearance-none w-full h-full p-0 cursor-pointer opacity-0 absolute z-50"
						/>
						<IoAdd
							onClick={() => inputRef.current.click()}
							size={33}
							className="absolute cursor-pointer text-zinc-950 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						/>
						<button
							type="button"
							style={{ backgroundColor: currentColor }}
							className="w-full h-full rounded-full cursor-pointer"
							onClick={() => inputRef.current.click()}
						/>
					</div>
				</div>

				{/* Display the selected colors as balls */}
				{colors.map((presetColor, index) => (
					<button
						type="button"
						key={index}
						className="w-8 h-8 rounded-full cursor-pointer flex-shrink-0"
						onClick={() =>
							setCategoryData({ ...categoryData, color: presetColor })
						}
						style={{ backgroundColor: presetColor }}
					/>
				))}
			</div>
		</div>
	);
}
