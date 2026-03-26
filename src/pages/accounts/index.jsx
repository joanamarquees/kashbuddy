import { IoIosArrowBack } from "react-icons/io";
import { MdAddCard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../components/AccountPopup.jsx";
import { NewAccountForms } from "../../components/NewAccount.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Drawer, setDrawerState } from "../../components/ui/Drawer.jsx";

import { useGetAccounts } from "../../hooks/useGetAccounts.js";
import { calculateNetworth } from "../../utils/networth.js";

export function Accounts() {
	const navigate = useNavigate();
	const { accounts, loading } = useGetAccounts();
	const { totalNetworth } = calculateNetworth(accounts);

	return (
		<div className="container mx-auto px-5 h-full select-none">
			<Drawer views={{ "New-account": <NewAccountForms /> }} />

			{/* Header */}
			<div className="py-6 flex flex-row items-center justify-between space-x-2">
				{accounts.length >= 1 && (
					<button type="button">
						<IoIosArrowBack
							size={30}
							className="cursor-pointer"
							onClick={() => navigate("/home")}
						/>
					</button>
				)}

				<h1 className="text-2xl md:text-4xl font-bold font-sans">
					BankAccounts
				</h1>

				{accounts.length >= 1 && (
					<button type="button">
						<MdAddCard
							size={30}
							onClick={() => setDrawerState("New-account")}
							className="cursor-pointer"
						/>
					</button>
				)}
			</div>

			{loading ? (
				<div>
					{/* Skeleton for Networth */}
					<div className="animate-pulse">
						<h2 className="text-gray-300 text-center text-2xl md:text-4xl font-sans">
							NETWORTH
						</h2>
						<div className="text-center font-extrabold py-10">
							<div className="w-48 h-16 bg-gray-300 rounded-lg mx-auto"></div>
						</div>
					</div>

					{/* Skeleton for Accounts List */}
					<div className="flex flex-col gap-3">
						{[1, 2, 3].map((index) => (
							<div
								key={index}
								className="flex h-16 justify-between items-center p-4 bg-zinc-800 rounded-lg animate-pulse"
							/>
						))}
					</div>
				</div>
			) : accounts.length <= 0 ? (
				// No Accounts
				<div className="py-6 flex flex-col items-center justify-center gap-8 md:text-lg">
					<p className="text-zinc-300 leading-relaxed max-w-80 md:max-w-lg text-center font-sans">
						You haven't registered any bank account, how about registering one
						right now?
					</p>
					<Button onClick={() => setDrawerState("New-account")}>
						Add an account
					</Button>
				</div>
			) : (
				// Accounts Page Content
				<div>
					<h2 className="text-zinc-400 text-center text-2xl md:text-4xl font-sans">
						{" "}
						NETWORTH{" "}
					</h2>
					<h3 className="text-indigo-400 text-center font-extrabold text-5xl md:text-7xl py-10 font-sans">
						{" "}
						{totalNetworth}€{" "}
					</h3>
					<div className="flex flex-col gap-3">
						{accounts.map(({ bankName, amount }) => (
							<Popup key={bankName} bankName={bankName} amount={amount} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
