import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BottomSheet, Button, Modal } from "@/components/index.js";
import { useMediaQuery } from "@/hooks/useMediaQuery.js";

const AVATAR_SEEDS = [
	"Joana",
	"Maria",
	"Sofia",
	"Beatriz",
	"Ines",
	"Leonor",
	"Matilde",
	"Alice",
];

export function AvatarPicker({ isOpen, currentSeed, onSelect, onClose }) {
	const [pendingSeed, setPendingSeed] = useState(currentSeed);
	const isDesktop = useMediaQuery("(min-width: 450px)");

	const handleSave = () => {
		onSelect(pendingSeed);
		onClose?.();
	};

	const content = (
		<div className="flex flex-col space-y-6 pt-2">
			<div className="grid grid-cols-4 gap-3 px-1">
				{AVATAR_SEEDS.map((seed) => (
					<button
						key={seed}
						type="button"
						onClick={() => setPendingSeed(seed)}
						className={twMerge(
							"aspect-square rounded-2xl overflow-hidden border-2 transition-all active:scale-95",
							pendingSeed === seed
								? "border-primary bg-light-background/10"
								: "border-white/5 bg-black/20 hover:border-white/20",
						)}
					>
						<img
							src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
							alt={seed}
							className="w-full h-full object-cover"
						/>
					</button>
				))}
			</div>

			<div className="flex gap-4 justify-center">
				<Button variant="secondary" onClick={onClose} className="flex-1">
					Cancel
				</Button>
				<Button variant="primary" onClick={handleSave} className="flex-1">
					Save
				</Button>
			</div>
		</div>
	);

	if (isDesktop) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} title="Choose Avatar">
				{content}
			</Modal>
		);
	}

	return (
		<BottomSheet open={isOpen} onClose={onClose} title="Choose Avatar">
			{content}
		</BottomSheet>
	);
}
