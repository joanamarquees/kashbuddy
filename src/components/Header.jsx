export const Header = ({ leftIcon, centerElement, rightIcon }) => (
	<div className="flex flex-row items-center justify-between h-12 mb-6">
		{leftIcon && <div>{leftIcon}</div>}
		{centerElement && (
			<div className="flex-1 items-center justify-center">{centerElement}</div>
		)}
		{rightIcon && <div>{rightIcon}</div>}
	</div>
);
