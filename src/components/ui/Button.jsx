import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const variants = {
	primary: "bg-primary text-white",
	secondary: "bg-muted-color",
	delete: "bg-transparent text-red-400",
};

export const Button = forwardRef(({ className, variant, ...props }, ref) => {
	return (
		<button
			{...props}
			ref={ref}
			className={cn(
				"w-full font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all px-6 py-3.5",
				variants[variant],
				className,
			)}
		/>
	);
});

Button.displayName = "Button";
