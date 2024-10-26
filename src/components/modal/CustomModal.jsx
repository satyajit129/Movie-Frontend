// Modal.js
import React, { useEffect } from 'react';
import './CustomModal.css';

const CustomModal = ({ show, closeModal, children }) => {
    useEffect(() => {
        // Add class to body to apply blur effect when modal is shown
        if (show) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open'); // Clean up on unmount
        };
    }, [show]);

    if (!show) return null;

    // Function to handle clicks on the overlay
    const handleOverlayClick = (e) => {
        // Close modal only if the overlay itself is clicked
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
