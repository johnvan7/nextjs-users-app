import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Suspense } from "react";
import Loading from "./loading";
import Header from "../_components/pages/Header";
import Providers from "@/_providers/page";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Users app',
}

export default function RootLayout({
  modals,
  children,
}: Readonly<{
  modals: React.ReactNode
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Providers>
            <Header />
            {children}
            {modals}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
