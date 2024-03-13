import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export type NotificationConfig = {
    id: number,
    message: string,
    severity: AlertColor,
    duration?: number
};

const SnackbarView = ({ id, message, severity, duration = 4000 }: NotificationConfig) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (id) {
            setIsVisible(true);
        }
    }, [id]);

    return (
        isVisible &&
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isVisible}
            onClose={() => setIsVisible(false)}
            autoHideDuration={duration}
            TransitionComponent={props => <Slide {...props} direction="left" />}
        >
            <Alert
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarView;