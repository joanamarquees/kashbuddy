import { ImSpinner } from "react-icons/im";

export const LoadingScreen = () => (
	<div className="h-2/3 w-full flex items-center justify-center animate-spin">
		<ImSpinner />
	</div>
);

export const SmallLoadingScreen = () => (
	<div className="h-fit w-full flex items-center justify-center animate-spin py-10">
		<ImSpinner />
	</div>
);
