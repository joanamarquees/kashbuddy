import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
	AccountForm,
	AddButton,
	Button,
	Header,
	LoadingScreen,
} from "@/components/index.js";
import { useAddAccount } from "@/hooks/useAddAccounts.js";
import { useGetAccounts } from "@/hooks/useGetAccounts.js";
import { calculateNetworth } from "@/utils/networth.js";
import { AccountCard } from "./_components/accountCard.jsx";

const EMPTY_ACCOUNT = { bankName: "", amount: "" };

export function Accounts() {
	const navigate = useNavigate();
	const { accounts, loading } = useGetAccounts();
	const { totalNetworth } = calculateNetworth(accounts);
	const { addAccount } = useAddAccount();

	const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
	const [newAccountData, setNewAccountData] = useState(EMPTY_ACCOUNT);
	const [error, setError] = useState("");

	const handleOpenNewAccount = () => {
		setNewAccountData(EMPTY_ACCOUNT);
		setError("");
		setIsNewAccountOpen(true);
	};

	const handleAddAccount = async () => {
		if (!newAccountData.bankName || !newAccountData.amount) {
			setError("Please fill in all fields");
			return;
		}
		await addAccount({
			bankName: newAccountData.bankName,
			amount: Number(parseFloat(newAccountData.amount)),
		});
		setIsNewAccountOpen(false);
	};

	return (
		<>
			<div className="mx-auto px-5 h-full select-none space-y-2 overflow-y-scroll">
				{/* Add Account Form */}
				<AccountForm
					isOpen={isNewAccountOpen}
					onClose={() => setIsNewAccountOpen(false)}
					onSave={handleAddAccount}
					formData={newAccountData}
					setFormData={setNewAccountData}
					isEdit={false}
					error={error}
					setError={setError}
				/>

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
						<p className="text-zinc-300 leading-relaxed max-w-80 md:max-w-lg text-center font-sans">
							You haven't registered any bank account, how about registering one
							right now?
						</p>
						<Button onClick={handleOpenNewAccount}>Add an account</Button>
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
					</div>
				)}
			</div>

			{/* Add account button */}
			{accounts.length >= 1 && <AddButton onClick={handleOpenNewAccount} />}
		</>
	);
}
