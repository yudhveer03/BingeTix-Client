import react, { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const login = (token) => {
        localStorage.setItem('token', token);
        setisLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setisLoggedIn(false);
    }

    useEffect(() => {
        localStorage.getItem('token') ? setisLoggedIn(true) : setisLoggedIn(false);

    }, [])
    

    return (
        <authContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () =>  useContext(authContext) ;
