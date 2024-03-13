import "@/app/globals.css";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react"
import ApolloAppProvider from "./apollo_app_provider";
import DarkLightThemeProvider from "./dark_light_theme_provider";
import Navbar from "@/components/navbar/navbar";

export const metadata = {
    title: "OpenPIM",
    description: "OpenPIM APP",
};

export default async function RootLayout({ children }) {
    const session = await auth()
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <SessionProvider session={session}>
                    <ApolloAppProvider>
                        <DarkLightThemeProvider>
                            <Navbar/>
                            {children}
                        </DarkLightThemeProvider>
                    </ApolloAppProvider>
                </SessionProvider>
            </body>
        </html>
    );
}