// src/components/StatsGrid.jsx
import React from 'react';

const StatsGrid = ({ correct, wrong, answered, total, language }) => {
  return (
    <div className="stats-grid">
      <div className="stat-item">
        <div className="label">{language === 'ID' ? 'Total Soal' : 'Total Questions'}</div>
        <div className="value">{total}</div>
      </div>
      <div className="stat-item">
        <div className="label">{language === 'ID' ? 'Terjawab' : 'Answered'}</div>
        <div className="value">{answered}</div>
      </div>
      <div className="stat-item">
        <div className="label">{language === 'ID' ? 'Benar' : 'Correct'}</div>
        <div className="value">{correct}</div>
      </div>
      <div className="stat-item">
        <div className="label">{language === 'ID' ? 'Salah' : 'Wrong'}</div>
        <div className="value">{wrong}</div>
      </div>
    </div>
  );
};

export default StatsGrid;