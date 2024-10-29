import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./nav/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import SignalRProvider from "./providers/SignalRProvider";
import { getCurrentUser } from "./actions/authAction";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sell Well",
  description: "Created by metalhead224",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser(); //we created this async function as it is server component

  const notifyUrl = process.env.NOTIFY_URL;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <Navbar />
        <main className="container mx-auto px-5 pt-10">
          <SignalRProvider user={user} notifyUrl={notifyUrl!}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
