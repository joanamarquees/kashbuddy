import { useEffect, useState } from "react";

/**
 * Custom hook that listens to a CSS media query and returns whether it matches.
 * @param {string} query - A CSS media query string, e.g. "(min-width: 768px)"
 * @returns {boolean} Whether the media query currently matches
 */
export function useMediaQuery(query) {
	const [matches, setMatches] = useState(
		() => window.matchMedia(query).matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		const handleChange = (e) => {
			setMatches(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		// Sync in case it changed between render and effect
		setMatches(mediaQuery.matches);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
}
