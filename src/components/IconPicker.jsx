import { useState } from "react";

import { iconList } from "@/utils/categories.js";
import { cn } from "@/utils/cn";

export function IconPicker({ categoryData, setCategoryData }) {
	const [selectedIcon, setSelectedIcon] = useState(5);

	const handleSelectIcon = (index) => {
		setSelectedIcon(index);
		setCategoryData({ ...categoryData, iconIndex: index });
	};

	return (
		<div className="grid grid-cols-6 md:grid-cols-8 gap-2">
			{iconList.map((Icon, index) => (
				<button
					type="button"
					key={index}
					className={cn(
						"flex flex-col items-center cursor-pointer p-1 rounded-full transition",
						selectedIcon === index ? "bg-indigo-400/50" : "",
					)}
					onClick={() => handleSelectIcon(index)}
				>
					<Icon size={24} />
				</button>
			))}
		</div>
	);
}
