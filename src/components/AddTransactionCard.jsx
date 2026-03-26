import { IoAddCircle } from "react-icons/io5";

export const AddTransactionCard = ({ transactionType, onClick, text }) => (
	<button
		type="button"
		className="container mx-auto p-3 w-full h-24 my-3 flex items-center border-dashed border-[1.5px] border-white rounded-xl cursor-pointer"
		onClick={onClick}
	>
		<IoAddCircle
			size={70}
			className="text-center"
			style={{ color: transactionType === "expense" ? "#f73131" : "#82f576" }}
		/>
		<p className="text-left text-sm ml-3">{text}</p>
	</button>
);
