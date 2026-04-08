import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoGrid, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Header } from "../../components/index";
import { Drawer, setDrawerState } from "../../components/ui/Drawer";
import { auth } from "../../config/firebase-config";

const avatarSeeds = [
	"Joana",
	"Maria",
	"Sofia",
	"Beatriz",
	"Ines",
	"Leonor",
	"Matilde",
	"Alice",
];

const AVATAR_STORAGE_KEY = "avatarSeed";

function getStoredAvatarSeed() {
	return localStorage.getItem(AVATAR_STORAGE_KEY) || "Joana";
}

export function Settings() {
	const navigate = useNavigate();
	const [avatarSeed, setAvatarSeed] = useState(getStoredAvatarSeed);

	const handleSelectAvatar = (seed) => {
		setAvatarSeed(seed);
		localStorage.setItem(AVATAR_STORAGE_KEY, seed);
		setDrawerState(null);
	};

	const signUserOut = async () => {
		try {
			await signOut(auth);
			localStorage.clear();
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	const avatarPicker = {
		avatar: (
			<div className="px-6 pb-4">
				<h3 className="text-xl font-bold mb-6 text-center">Choose Avatar</h3>
				<div className="grid grid-cols-4 gap-4">
					{avatarSeeds.map((seed) => (
						<motion.button
							key={seed}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => handleSelectAvatar(seed)}
							className={twMerge(
								"aspect-square rounded-2xl overflow-hidden border-2 transition-all",
								avatarSeed === seed
									? "border-[#818cf8] bg-[#818cf8]/10"
									: "border-white/5 bg-black/20 hover:border-white/20",
							)}
						>
							<img
								src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
								alt={seed}
								className="w-full h-full object-cover"
							/>
						</motion.button>
					))}
				</div>
			</div>
		),
	};

	return (
		<div className="mx-auto px-4 h-full flex flex-col space-y-3">
			{/* Header */}
			<Header
				leftIcon={
					<IoIosArrowBack
						size={30}
						className="cursor-pointer"
						onClick={() => navigate("/home")}
					/>
				}
				centerElement={
					<h1 className="text-xl font-bold font-sans mx-2 grow text-center text-muted-color uppercase">
						Settings
					</h1>
				}
				rightIcon={<div className="w-8"></div>}
			/>

			{/* Avatar */}
			<div className="flex flex-col items-center space-y-2 py-4">
				<button
					type="button"
					className="relative active:scale-95"
					onClick={() => setDrawerState("avatar")}
				>
					<div className="w-24 h-24 border-4 border-primary shadow-2xl shadow-primary/20 rounded-3xl bg-light-background flex items-center justify-center overflow-hidden">
						<img
							src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
				</button>
				<p className="text-md text-gray-500 font-medium tracking-wide lowercase">
					youremail@gmail.com
				</p>
			</div>

			<div className="space-y-5">
				<div className="flex items-center justify-between px-2">
					<h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
						menu
					</h3>
				</div>

				<div className="flex flex-col space-y-4 w-full">
					{/* Categories */}
					<button
						type="button"
						className="bg-light-background border-2 border-primary/10 space-x-4 rounded-xl w-full p-5 flex items-center group hover:border-[#818cf8]/30 transition-all active:scale-[0.98]"
						onClick={() => navigate("/settings/categories")}
					>
						<IoGrid size={25} style={{ color: "purple" }} />
						<p className="text-left font-medium text-sm"> Categories </p>
					</button>

					{/* Logout */}
					<button
						type="button"
						className="bg-light-background border-2 border-primary/10 space-x-4 rounded-xl w-full p-5 flex items-center group hover:border-[#818cf8]/30 transition-all active:scale-[0.98]"
						onClick={signUserOut}
					>
						<IoLogOutOutline size={25} className="text-red-400" />
						<p className="text-left font-medium text-sm"> Logout </p>
					</button>
				</div>
			</div>

			<Drawer views={avatarPicker} />
		</div>
	);
}
