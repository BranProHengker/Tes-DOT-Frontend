import React from 'react';

const LoginCard = ({ language, setLanguage, username, setUsername, handleLogin }) => {
  return (
    <div className="login-card">
      <h2>Masuk</h2>
      <p>Masukkan nama untuk memulai kuis</p>
      <div className="lang-switch">
        <button
          className={`lang-btn ${language === 'ID' ? 'active' : ''}`}
          onClick={() => setLanguage('ID')}
        >
          ID
        </button>
        <button
          className={`lang-btn ${language === 'EN' ? 'active' : ''}`}
          onClick={() => setLanguage('EN')}
        >
          EN
        </button>
      </div>

      <div className="input-group">
        <label>Nama</label>
        <input
          type="text"
          placeholder={language === 'ID' ? 'Nama kamu' : 'Your name'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <button className="start-btn" onClick={handleLogin}>
        {language === 'ID' ? 'Mulai' : 'Start'}
      </button>
    </div>
  );
};

export default LoginCard;