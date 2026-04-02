import { IoIosArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Drawer,
	Header,
	LoadingScreen,
	NewAccountForms,
	setDrawerState,
} from "../../components/index.js";
import { useGetAccounts } from "../../hooks/useGetAccounts.js";
import { calculateNetworth } from "../../utils/networth.js";
import { AccountCard } from "./_components/AccountCard.jsx";

//

export function Accounts() {
	const navigate = useNavigate();
	const { accounts, loading } = useGetAccounts();
	const { totalNetworth } = calculateNetworth(accounts);

	return (
		<div className="mx-auto px-5 h-full select-none space-y-2 overflow-y-scroll">
			<Drawer views={{ "New-account": <NewAccountForms /> }} />

			{/* Header */}
			<Header
				leftIcon={
					<IoIosArrowBack
						size={35}
						className="cursor-pointer"
						onClick={() => navigate("/home")}
					/>
				}
			/>

			{/* Loading Spinner */}
			{loading && <LoadingScreen />}

			{/* No Accounts */}
			{accounts.length <= 0 && (
				<div className="py-6 h-full w-full flex flex-col items-center justify-center gap-8 md:text-lg">
					{/* TODO: add an empty wallet svg */}
					<p className="text-zinc-300 leading-relaxed max-w-80 md:max-w-lg text-center font-sans">
						You haven't registered any bank account, how about registering one
						right now?
					</p>
					<Button onClick={() => setDrawerState("New-account")}>
						Add an account
					</Button>
				</div>
			)}

			{/* Accounts Page Content */}
			{accounts.length >= 1 && (
				<div className="space-y-10">
					{/* Total Net Worth */}
					<div className="space-y-2">
						<h2 className="text-zinc-400 text-center uppercase tracking-wider font-bold text-sm font-sans">
							TOTAL NET WORTH
						</h2>
						<span className="flex items-end justify-center text-indigo-400 text-center font-extrabold text-6xl md:text-7xl font-sans">
							{totalNetworth}
							<p className="text-muted-color font-medium text-3xl ml-1">€</p>
						</span>
					</div>

					{/* Accounts list */}
					<div className="space-y-5">
						<div className="flex items-center justify-between px-2">
							<h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
								Your Accounts
							</h3>
						</div>

						<div className="flex flex-col space-y-4 w-full">
							{accounts.map(({ bankName, amount }) => (
								<AccountCard
									key={bankName}
									bankName={bankName}
									amount={amount}
								/>
							))}
						</div>
					</div>

					{/* Add account button */}
					<button
						type="button"
						onClick={() => setDrawerState("New-account")}
						className="fixed bottom-5 right-5 bg-primary/20 w-16 h-16 p-2 cursor-pointer flex items-center justify-center rounded-full active:scale-95 transition-all"
					>
						<IoAdd size className="text-primary" />
					</button>
				</div>
			)}
		</div>
	);
}
