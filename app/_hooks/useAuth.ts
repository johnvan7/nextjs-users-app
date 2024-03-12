import { useContext } from "react"
import { AuthContext } from "../_contexts/AuthContext";


const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;