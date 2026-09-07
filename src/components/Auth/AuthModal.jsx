import React from 'react'
import { useAuthModal } from '../../context/AuthModalContext';
import "./AuthModal.css";
import { FaTimes } from "react-icons/fa";
import Login from './Login';
import Register from './Register';


const AuthModal = () => {

    const { isOpen, closeModal, modalView, setModalView } = useAuthModal();

    if (!isOpen) return;




    return (
        <>
            <div className='modal-overlay' onClick={closeModal}>
                
                <div className="modal-content"onClick={(e)=>e.stopPropagation()}>

                   <button className="close-btn" onClick={closeModal}><FaTimes/></button>

                    {modalView === 'default' && <Login  onSuccess={closeModal} onSwitchToRegister={() => setModalView('register')} /> }
                    {modalView === 'register' && <Register onSuccess={closeModal} onSwitchToLogin={() => setModalView('default')} />}

                </div>

        </div>
        
        </>

  )
}

export default AuthModal;