import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef(
	({ label, isMoneyInput, className, ...props }, ref) => {
		return (
			<div className="space-y-2">
				<label
					htmlFor={props.id}
					className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2"
				>
					{label}
				</label>
				<div className="relative">
					<input
						{...props}
						ref={ref}
						className={twMerge(
							"w-full bg-black/20 border border-white/5 rounded-2xl px-4 py-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-color placeholder:uppercase placeholder:text-sm",
							isMoneyInput && "pr-12",
							className,
						)}
					/>

					{isMoneyInput && (
						<span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
							€
						</span>
					)}
				</div>
			</div>
		);
	},
);

Input.displayName = "Input";
