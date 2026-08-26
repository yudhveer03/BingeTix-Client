import { useState, createContext, useContext, children } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [modalView, setmodalView] = ('default');
}

const openModal = (view = 'default') => {
    setmodalView(view);
    setOpen(true);
};

const closeModal = () => {
    setOpen(false);
    setmodalView('deafult');


return (
    <AuthModalContext.Provider value={{ open, modalView, openModal, closeModal, setmodalView }}>
        {children}
    </AuthModalContext.Provider>

);
};
export const useAuthModal = () => useContext(AuthModalContext);