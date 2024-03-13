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
import SnackbarView, { NotificationConfig } from "../_components/views/SnackbarView";
import { NotificationProvider } from "../_contexts/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  modals,
  children,
}: Readonly<{
  modals: React.ReactNode
  children: React.ReactNode
}>) {
  let sessionToken = '';
  if (sessionStorage) {
    const token = sessionStorage.getItem('token');
    sessionToken = token ? token : '';
  }
  const [token, setToken] = useState(sessionToken);
  const [notification, showNotification] = useState<NotificationConfig>({id: 0, message: '', severity: 'info' });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <NotificationProvider value={{ notification, showNotification }}>
            <Provider store={usersStore}>
              <AuthProvider value={{ token, setToken }}>
                <Header />
                {children}
                {modals}
              </AuthProvider>
            </Provider>
          </NotificationProvider>
          <SnackbarView
            id={notification.id}
            message={notification.message}
            severity={notification.severity}
            duration={notification.duration}
          />
        </Suspense>
      </body>
    </html>
  );
}
