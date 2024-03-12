import { createContext } from "react";

const AuthContext = createContext<{token: string, setToken: (x: string) => void}>({token: '', setToken: (x) => {}}); //token

const AuthProvider = AuthContext.Provider;

export { AuthContext, AuthProvider};