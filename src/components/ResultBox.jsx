// src/components/ResultBox.jsx
import React from 'react';
import StatsGrid from './StatsGrid';

const ResultBox = ({ language, username, questions, userAnswers, resetQuiz }) => {
  // 🔥 Perbaikan: Hitung jawaban benar, salah, dan terjawab
  const calculateScore = () => {
    let correct = 0;
    let wrong = 0;
    let answered = 0;

    questions.forEach((q, i) => {
      if (userAnswers[i] !== null) {
        answered++;
        if (q.correct_answer === userAnswers[i]) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    return { correct, wrong, answered, total: questions.length };
  };

  const score = calculateScore();

  return (
    <div className="result-box">
      <h3>{language === 'ID' ? 'Hasil Kuis' : 'Quiz Result'}</h3>
      <p>{language === 'ID' ? 'Bagus kerjaanmu,' : 'Good job,'} {username}!</p>

      <StatsGrid
        correct={score.correct}
        wrong={score.wrong}
        answered={score.answered}
        total={score.total}
        language={language}
      />

      <button className="retry-btn" onClick={resetQuiz}>
        {language === 'ID' ? 'Coba Lagi' : 'Try Again'}
      </button>
    </div>
  );
};

export default ResultBox;