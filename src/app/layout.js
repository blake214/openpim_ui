import "@/app/globals.css";
import Navbar from "@/app/components/navbar/navbar";
import Providers from "./providers";

export const metadata = {
    title: "OpenPIM",
    description: "OpenPIM APP",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navbar/>
                    {children}
                </Providers>
            </body>
        </html>
    );
}


// https://www.youtube.com/watch?v=vCOSTG10Y4o&ab_channel=LamaDev