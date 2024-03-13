import { createContext } from "react";
import { NotificationConfig } from "../_components/views/SnackbarView";

const NotificationContext = createContext<{notification: NotificationConfig, showNotification: (x: NotificationConfig) => void}>({
    notification: {id: 0, message: '', severity: 'info'},
    showNotification: (x) => {}
});

const NotificationProvider = NotificationContext.Provider;

export { NotificationContext, NotificationProvider};