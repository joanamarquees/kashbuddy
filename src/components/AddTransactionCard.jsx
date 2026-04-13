import { Plus } from "lucide-react";
import { cn } from "@/utils/cn";

export const AddTransactionCard = ({ transactionType, onClick, text }) => (
	<button
		type="button"
		className="w-full p-4 flex items-center bg-card-surface/50 border-2 border-dashed border-primary/20 rounded-2xl cursor-pointer transition-all hover:bg-primary/5 hover:border-primary/40 group mb-4"
		onClick={onClick}
	>
		<div
			className={cn(
				"p-3 rounded-xl transition-colors shrink-0",
				transactionType === "expense" ? "bg-red-400/20" : "bg-green-400/20",
			)}
		>
			<Plus
				className={cn(
					"w-8 h-8",
					transactionType === "expense" ? "text-red-400" : "text-green-400",
				)}
			/>
		</div>
		<p className="text-left text-sm font-medium text-zinc-300 ml-4 leading-relaxed">
			{text}
		</p>
	</button>
);
