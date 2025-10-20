import React from 'react';
import StatsGrid from './StatsGrid';

const ResultBox = ({ language, username, questions, userAnswers, resetQuiz }) => {
  // 🔥 Pastikan questions ada
  if (!questions || !Array.isArray(questions)) {
    return <div>Memuat hasil...</div>;
  }

  let correct = 0;
  let wrong = 0;
  questions.forEach((q, i) => {
    if (q.correct_answer === userAnswers[i]) {
      correct++;
    } else {
      wrong++;
    }
  });

  return (
    <div className="result-box">
      <h3>{language === 'ID' ? 'Hasil Kuis' : 'Quiz Result'}</h3>
      <p>{language === 'ID' ? 'Bagus kerjaanmu,' : 'Good job,'} {username}!</p>

      <StatsGrid correct={correct} wrong={wrong} total={questions.length} language={language} />

      <button className="retry-btn" onClick={resetQuiz}>
        {language === 'ID' ? 'Coba Lagi' : 'Try Again'}
      </button>
    </div>
  );
};

export default ResultBox;