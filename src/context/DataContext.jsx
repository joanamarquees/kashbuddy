import { createContext, useContext } from "react";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { useGetCategories } from "../hooks/useGetCategories";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const { categories, loading: categoriesLoading } = useGetCategories();
	const { accounts, loading: accountsLoading } = useGetAccounts();

	const value = {
		categories,
		accounts,
		loading: categoriesLoading || accountsLoading,
		categoriesLoading,
		accountsLoading,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
};
