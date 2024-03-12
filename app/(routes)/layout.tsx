'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Suspense, useState } from "react";
import Loading from "./loading";
import Header from "../_components/pages/Header";
import { usersStore } from "../_state/users/store";
import { Provider } from "react-redux";
import { AuthProvider } from "../_contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  modals,
  children,
}: Readonly<{
  modals: React.ReactNode
  children: React.ReactNode
}>) {
  let sessionToken = '';
  if(sessionStorage){
    const token = sessionStorage.getItem('token');
    sessionToken = token ? token : '';
  }
  const [authToken, setAuthToken] = useState(sessionToken);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Provider store={usersStore}>
            <AuthProvider value={{token: authToken, setToken: setAuthToken}}>
              <Header />
              {children}
              {modals}
            </AuthProvider>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
