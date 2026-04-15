import { signOut } from "firebase/auth";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoGrid, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/index";
import { auth } from "@/config/firebase-config";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import { AvatarPicker } from "./_components/AvatarPicker.jsx";

const AVATAR_STORAGE_KEY = "avatarSeed";

function getStoredAvatarSeed() {
	return localStorage.getItem(AVATAR_STORAGE_KEY) || "Joana";
}

export function Settings() {
	const navigate = useNavigate();
	const { name } = useGetUserInfo();
	const [avatarSeed, setAvatarSeed] = useState(getStoredAvatarSeed);
	const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

	const handleSelectAvatar = (seed) => {
		setAvatarSeed(seed);
		localStorage.setItem(AVATAR_STORAGE_KEY, seed);
		setIsAvatarPickerOpen(false);
	};

	const handleOpenAvatarPicker = () => {
		setIsAvatarPickerOpen(true);
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
					onClick={handleOpenAvatarPicker}
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
					{name}
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

			<AvatarPicker
				isOpen={isAvatarPickerOpen}
				currentSeed={avatarSeed}
				onSelect={handleSelectAvatar}
				onClose={() => setIsAvatarPickerOpen(false)}
			/>
		</div>
	);
}
