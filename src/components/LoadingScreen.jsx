import { ImSpinner } from "react-icons/im";

export const LoadingScreen = () => (
	<div className="h-2/3 w-full flex items-center justify-center animate-spin">
		<ImSpinner />
	</div>
);
