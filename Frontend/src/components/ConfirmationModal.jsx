// components/ConfirmationModal.jsx
import React from "react";

export default function ConfirmationModal({ show, onCancel, onConfirm, message }) {
    if (!show) return null;

    return (
        <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Conferma</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onCancel}>Annulla</button>
                        <button className="btn btn-danger" onClick={onConfirm}>Rimuovi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
