import React from 'react';
import { useAuthModal } from '../../context/AuthModalContext';
import { FaTimes, FaGoogle, FaPhoneAlt, FaArrowLeft } from 'react-icons/fa';
import './AuthModal.css';

const AuthModal = () => {
    const { isOpen, closeModal, modalView, setModalView } = useAuthModal();


    if (!isOpen) return;


    const renderDefaultView = () => (
        <>
            <div className="modal-header">
                <h2>Welcome to BingeTix</h2>
                <p>Login to book your tickets</p>
            </div>

            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn-primary">Login</button>
            </form>

            <div className="divider">OR</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn-secondary" type="button">
                    <FaGoogle style={{ color: '#ea4335' }} /> Continue with Google
                </button>
                {/* Switch to Phone View when clicked */}
                <button className="btn-secondary" type="button" onClick={() => setModalView('phone')}>
                    <FaPhoneAlt style={{ color: '#10b981' }} /> Login with OTP
                </button>
            </div>

            <div className="modal-footer-text">
                Don't have an account? <span>Sign up</span>
            </div>
        </>

    );


    const renderPhoneView = () => (
        <>
            <button className="btn-back" onClick={() => setModalView('default')}>
                <FaArrowLeft /> Back
            </button>

            <div className="modal-header">
                <h2>Login with OTP</h2>
                <p>Enter your phone number to receive a secure code</p>
            </div>

            <form className="modal-form" onSubmit={(e) => {
                e.preventDefault();
                setModalView('otp'); // Simulate sending OTP and moving to next screen
            }}>
                <div className="input-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 99999 99999" required />
                </div>
                <button type="submit" className="btn-primary">Send OTP</button>
            </form>
        </>
    );

    // --- VIEW 3: Enter OTP Code View ---
    const renderOtpView = () => (
        <>
            <button className="btn-back" onClick={() => setModalView('phone')}>
                <FaArrowLeft /> Back
            </button>

            <div className="modal-header">
                <h2>Enter OTP</h2>
                <p>We've sent a 6-digit code to your phone</p>
            </div>

            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <label>Secure Code</label>
                    <input
                        type="text"
                        maxLength="6"
                        placeholder="000000"
                        required
                        style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '1.2rem' }}
                    />
                </div>
                <button type="submit" className="btn-primary">Verify & Login</button>
            </form>
        </>
    );

    return (
        /* The Overlay: Clicking this closes the modal */
        <div className="modal-overlay" onClick={closeModal}>

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <button
                    className="close-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeModal();
                    }}
                >
                    <FaTimes />
                </button>

                {/* Dynamically render the correct view based on state */}
                {modalView === 'default' && renderDefaultView()}
                {modalView === 'phone' && renderPhoneView()}
                {modalView === 'otp' && renderOtpView()}

            </div>
        </div>
    );
};

export default AuthModal;