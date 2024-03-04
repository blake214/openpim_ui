import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "./providers";
import ApolloAppProvider from "./apollo_app_provider";
import { auth } from "@/lib/auth";

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
                    <ApolloAppProvider>
                        <Navbar session={session}/>
                        {children}
                    </ApolloAppProvider>
                </Providers>
            </body>
        </html>
    );
}