import { Drawer } from "vaul";
import { cn } from "@/utils/cn";

export const BottomSheet = ({
	open,
	onClose,
	children,
	title,
	dismissible = true,
	avoidBottomSafeArea = false,
	className,
	overlayClassName,
	contentClassName,
}) => (
	<Drawer.Root
		dismissible={dismissible}
		onOpenChange={(isOpen) => !isOpen && onClose()}
		open={open}
		repositionInputs={false}
	>
		<Drawer.Portal>
			<Drawer.Overlay
				className={cn("fixed inset-0 z-99 bg-black/90", overlayClassName)}
			/>
			<Drawer.Content
				className={cn(
					"fixed bottom-0 z-999 flex w-full transform-gpu flex-col rounded-t-main-radius bg-light-background will-change-transform",
					"app:max-h-[calc(100dvh-env(safe-area-inset-top))] web:max-h-full",
					//apply changes in max-h and starting y post when we want to avoid safe area
					avoidBottomSafeArea &&
						"app:max-h-[calc(100dvh-(env(safe-area-inset-top)))]",
					className,
				)}
			>
				<div
					className={cn(
						"flex-1 flex min-h-0 w-full flex-col overflow-y-hidden space-y-5",
						contentClassName ?? "px-safe-or-4 py-4",
						//apply bottom safe area margin when we want to avoid safe area so that the content is not cut off by the safe area
						avoidBottomSafeArea && "mb-safe",
					)}
				>
					<Drawer.Handle className="mx-auto h-1 w-12 shrink-0 rounded-full bg-main-color" />
					{title && (
						<h2 className="text-md font-extrabold mx-auto w-full text-center uppercase tracking-wide text-main-color">
							{title}
						</h2>
					)}
					<div className="px-5 overflow-y-scroll">{children}</div>
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
);
