import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "./providers";
import ApolloAppProvider from "./apollo_app_provider";

export const metadata = {
    title: "OpenPIM",
    description: "OpenPIM APP",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <ApolloAppProvider>
                        <Navbar/>
                        {children}
                    </ApolloAppProvider>
                </Providers>
            </body>
        </html>
    );
}