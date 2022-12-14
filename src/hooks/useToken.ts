import { useContext, useState } from "react";
import { SocketContext } from "../App";

const useToken = (): [
    token: string | null,
    setTokenStorage: (token: string | null) => void
] => {

    const socket = useContext(SocketContext);

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    function setTokenStorage(token: string | null) {
        if (token) {
            localStorage.setItem("token", token);
            setToken(token);
        } else {
            localStorage.removeItem("token");
            setToken(null);
        }
    };

    return [token, setTokenStorage];
};

export default useToken;