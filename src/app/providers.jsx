"use client"

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from 'react'

export default function Providers({ children }) {
	// ===== This block for differenciating when a user or server had rendered this
	const [mounted, setMounted] = useState(false)
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return <>{children}</>
	// ===== This block for differenciating when a user or server had rendered this
	return (
		<ThemeProvider defaultTheme="system" enableSystem>
			{children}
		</ThemeProvider>
	);
}