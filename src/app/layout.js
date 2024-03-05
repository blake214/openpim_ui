import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "./providers";
import ApolloAppProvider from "./apollo_app_provider";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react"

export const metadata = {
    title: "OpenPIM",
    description: "OpenPIM APP",
};

export default async function RootLayout({ children }) {
    const session = await auth()
    return (
        <html lang="en">
            <body>
                <Providers>
                    <SessionProvider session={session}>
                        <ApolloAppProvider>
                            <Navbar/>
                            {children}
                        </ApolloAppProvider>
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}