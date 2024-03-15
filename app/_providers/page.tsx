'use client'
import SnackbarView, { NotificationConfig } from '@/_components/views/SnackbarView';
import { AuthProvider } from '@/_contexts/AuthContext';
import { NotificationProvider } from '@/_contexts/NotificationContext';
import { usersStore } from '@/_state/users/store';
import React, { ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux';

type Props = {
    children: ReactNode;
}

const Providers = ({ children }: Props) => {
    const [token, setToken] = useState('');
    const [notification, showNotification] = useState<NotificationConfig>({ id: 0, message: '', severity: 'info' });

    useEffect(() => {
        try{
            if(window){
                const storageToken = window.sessionStorage.getItem('token');
                if(storageToken){
                    setToken(storageToken);
                }
            }
        } catch (e) {}
    }, []);

    return (
        <>
            <NotificationProvider value={{ notification, showNotification }}>
                <Provider store={usersStore}>
                    <AuthProvider value={{ token, setToken }}>
                        {children}
                    </AuthProvider>
                </Provider>
            </NotificationProvider>
            <SnackbarView
                id={notification.id}
                message={notification.message}
                severity={notification.severity}
                duration={notification.duration}
            />
        </>
    )
}

export default Providers;