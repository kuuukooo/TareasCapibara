import React from 'react';
import '../hojas-de-estilo/CapiModal.css';

function CapiModal({ mensaje, onClose }) {
    return (
        <div className="capi-modal">
            <p>{mensaje}</p>
            <button 
              onClick={onClose}>
                Ok
            </button>
        </div>
    );
}

export default CapiModal;
