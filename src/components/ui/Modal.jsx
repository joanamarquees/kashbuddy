import { X } from "lucide-react";

export const Modal = ({ isOpen = true, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] sm:items-center sm:p-0">
			<button
				type="button"
				onClick={onClose}
				className="fixed bottom-0 left-0 h-full w-full bg-black/60 backdrop-blur-xs cursor-default"
				aria-label="Close modal"
			/>

			{/* Modal Content */}
			<div className="relative my-auto w-full mx-5 md:max-w-3/5 max-h-4/5 bg-light-background rounded-4xl p-8 border border-white/10 shadow-2xl">
				<div className="flex flex-row items-center justify-between">
					<button
						type="button"
						onClick={onClose}
						className="p-2 bg-white/5 rounded-full text-muted-color active:scale-95 transition-all hover:text-white"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{title && (
					<h3 className="text-md font-extrabold mx-auto w-full text-center uppercase tracking-wide text-main-color mb-6">
						{title}
					</h3>
				)}

				<div className="space-y-6">{children}</div>
			</div>
		</div>
	);
};
