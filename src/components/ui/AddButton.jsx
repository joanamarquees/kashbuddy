import { IoAdd } from "react-icons/io5";

export const AddButton = ({ onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className="fixed bottom-5 right-5 z-50 bg-primary/20 backdrop-blur-md w-16 h-16 p-2 cursor-pointer flex items-center justify-center rounded-full active:scale-95 transition-all"
	>
		<IoAdd size={45} className="text-primary" />
	</button>
);
