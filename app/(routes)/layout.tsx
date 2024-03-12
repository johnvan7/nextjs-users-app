'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Suspense } from "react";
import Loading from "./loading";
import Header from "../_components/pages/Header";
import Footer from "../_components/pages/Footer";
import { usersStore } from "../_state/users/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

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
          <Provider store={usersStore}>
            <Header />
            {children}
            {modals}
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
