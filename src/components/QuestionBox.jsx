import React from 'react';
import QuestionBox from './QuestionBox';
import ResultBox from './ResultBox';

const QuizCard = ({
  language,
  setLanguage,
  handleLogout,
  username,
  userAnswers,
  questions,
  timer,
  showResult,
  currentQuestionIndex,
  decodedQuestion,
  handleAnswerClick,
  resetQuiz,
  currentQuestion // Terima currentQuestion dari App.js
}) => {
  return (
    <div className="quiz-card">
      <div className="header">
        <h2>Kuis OpenTDB</h2>
        <div className="controls">
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
          <button className="logout-btn" onClick={handleLogout}>
            {language === 'ID' ? 'Logout' : 'Logout'}
          </button>
        </div>
      </div>

      <div className="user-info">
        <div className="greeting">
          {language === 'ID' ? `Halo, ${username}` : `Hello, ${username}`}
        </div>
        <div className="stats">
          <div>{language === 'ID' ? 'Terjawab:' : 'Answered:'} {userAnswers.filter(a => a !== null).length}/{questions.length}</div>
          <div>{language === 'ID' ? 'Sisa Waktu:' : 'Time Left:'} 00:{timer < 10 ? '0' : ''}{timer}</div>
        </div>
      </div>

      {showResult ? (
        <ResultBox language={language} username={username} questions={questions} userAnswers={userAnswers} resetQuiz={resetQuiz} />
      ) : (
        <QuestionBox
          decodedQuestion={decodedQuestion}
          userAnswers={userAnswers}
          currentQuestionIndex={currentQuestionIndex}
          handleAnswerClick={handleAnswerClick}
          language={language}
          currentQuestion={currentQuestion} // Kirim ke QuestionBox
        />
      )}

      <button className="reset-btn" onClick={() => window.location.reload()}>
        {language === 'ID' ? 'Reset' : 'Reset'}
      </button>
    </div>
  );
};

export default QuizCard;