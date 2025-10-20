// src/components/ResumeModal.jsx
import React from 'react';

const ResumeModal = ({ onContinue, onStartNew }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Lanjutkan Kuis?</h3>
        <p>Kamu sebelumnya sudah mengerjakan kuis. Apakah kamu ingin melanjutkan?</p>
        <div className="modal-buttons">
          <button className="modal-btn resume-btn" onClick={onContinue}>
             Lanjutkan
          </button>
          <button className="modal-btn start-btn" onClick={onStartNew}>
            Mulai Ulang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;