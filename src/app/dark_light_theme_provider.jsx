"use client"

import { ThemeProvider } from "next-themes";

export default function DarkLightThemeProvider({ children }) {
	return (
		<ThemeProvider defaultTheme="system" enableSystem>
			{children}
		</ThemeProvider>
	);
}