// src/components/QuestionBox.jsx
import React from 'react';

const QuestionBox = ({ question, userAnswers, currentQuestionIndex, handleAnswerClick, language, currentQuestion }) => {
  return (
    <div className="question-box">
      <div className="question">{question}</div>

      <div className="options">
        <button
          className={`option-btn ${userAnswers[currentQuestionIndex] === 'True' ? 'selected' : ''}`}
          onClick={() => handleAnswerClick('True')}
          disabled={userAnswers[currentQuestionIndex] !== null}
        >
          {language === 'ID' ? 'Benar' : 'True'}
        </button>
        <button
          className={`option-btn ${userAnswers[currentQuestionIndex] === 'False' ? 'selected' : ''}`}
          onClick={() => handleAnswerClick('False')}
          disabled={userAnswers[currentQuestionIndex] !== null}
        >
          {language === 'ID' ? 'Salah' : 'False'}
        </button>
      </div>

      {userAnswers[currentQuestionIndex] !== null && currentQuestion && (
        <div className="feedback">
          {userAnswers[currentQuestionIndex] === currentQuestion.correct_answer ? (
            <p style={{ color: '#4caf50' }}>{language === 'ID' ? '✔️ Jawaban benar!' : '✔️ Correct answer!'}</p>
          ) : (
            <p style={{ color: '#f44336' }}>
              {language === 'ID'
                ? `❌ Jawaban salah. Jawaban yang benar: ${currentQuestion.correct_answer}`
                : `❌ Wrong answer. Correct answer: ${currentQuestion.correct_answer}`
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionBox;