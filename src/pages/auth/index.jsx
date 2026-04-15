import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // to change from login to home page
import logo from "../../assets/logo_light.svg";
import { Button } from "../../components/ui/Button.jsx";
import { auth, db, provider } from "../../config/firebase-config";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const defaultCategories = [
	{
		value: "grocery",
		label: "grocery",
		iconIndex: 2,
		color: "#7a2680",
		categoryType: "expense",
	},
	{
		value: "transports",
		label: "transports",
		iconIndex: 16,
		color: "#204718",
		categoryType: "expense",
	},
	{
		value: "health",
		label: "health",
		iconIndex: 8,
		color: "#eb4034",
		categoryType: "expense",
	},
	{
		value: "food",
		label: "food",
		iconIndex: 42,
		color: "#34d6eb",
		categoryType: "expense",
	},
	{
		value: "salary",
		label: "salary",
		iconIndex: 34,
		color: "#381bab",
		categoryType: "income",
	},
];

export const Auth = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const { isAuth, userId } = useGetUserInfo();
	const [checkingAuth, setCheckingAuth] = useState(true);

	// Redirect already-authenticated users initially
	useEffect(() => {
		const checkInitialRoute = async () => {
			if (!isAuth || !userId) {
				setCheckingAuth(false);
				return;
			}

			try {
				const accountsQuery = query(
					collection(db, "accounts"),
					where("userId", "==", userId),
				);
				const snapshot = await getDocs(accountsQuery);

				if (snapshot.empty) {
					navigate("/accounts", { replace: true });
				} else {
					navigate("/home", { replace: true });
				}
			} catch (err) {
				console.error("Error checking initial route", err);
				navigate("/home", { replace: true });
			}
		};
		checkInitialRoute();
	}, [isAuth, userId, navigate]);

	// While redirecting or checking auth state, render nothing to avoid flashes
	if (isAuth || checkingAuth) return null;

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider);

			const authData = {
				userId: result.user.uid,
				name: result.user.displayName,
				isAuth: true,
			};

			const additionalInfo = getAdditionalUserInfo(result);
			if (additionalInfo?.isNewUser) {
				const categoriesCollection = collection(db, "categories");
				const promises = defaultCategories.map((cat) =>
					addDoc(categoriesCollection, {
						userId: result.user.uid,
						...cat,
					}),
				);
				// Run in background, we don't need to block login for this
				Promise.all(promises).catch((err) =>
					console.error("Error generating default categories", err),
				);
			}

			localStorage.setItem("auth", JSON.stringify(authData));

			// Check accounts to figure out where to route them
			const accountsQuery = query(
				collection(db, "accounts"),
				where("userId", "==", result.user.uid),
			);
			const snapshot = await getDocs(accountsQuery);

			if (snapshot.empty) {
				navigate("/accounts", { replace: true });
			} else {
				navigate("/home", { replace: true });
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-8 px-5">
			<img src={logo} className="w-64 md:w-96" alt="Kashbuddy logo" />
			<div className="leading-relaxed max-w-80 text-center font-sans font-semibold text-lg text-green-100">
				<p>Welcome to Kashbuddy!</p>
				<p>Please login with Google to continue</p>
			</div>
			<Button
				variant="primary"
				className="login-button"
				onClick={signInWithGoogle}
			>
				Login with Google
			</Button>
			{error && <p className="text-red-400 text-sm">{error}</p>}
		</div>
	);
};
