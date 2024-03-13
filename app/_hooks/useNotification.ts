import { useContext } from "react"
import { NotificationContext } from "../_contexts/NotificationContext";


const useNotification = () => {
    return useContext(NotificationContext);
};

export default useNotification;