import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<div className="flex h-dvh flex-col items-center justify-center bg-background text-main-color font-['Nunito',_sans-serif]">
			<h1 className="text-[4rem] font-bold">404</h1>
			<h2 className="text-[2rem] mb-8">Page not found</h2>
			<Link 
				to="/" 
				className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-100"
			>
				Go back home
			</Link>
		</div>
	);
};
