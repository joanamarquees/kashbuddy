import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//utility for merging tailwind classes
export const cn = (...inputs) => {
	return twMerge(clsx(inputs));
};
