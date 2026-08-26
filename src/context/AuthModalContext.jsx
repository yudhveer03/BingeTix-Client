import React, { useState, createContext, useContext } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [modalView, setModalView] = useState('default');

    const openModal = (view = 'default') => {
        setModalView(view);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setModalView('default');
    };

    return (
        <AuthModalContext.Provider value={{ isOpen, modalView, openModal, closeModal, setModalView }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => useContext(AuthModalContext);