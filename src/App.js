// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import LoginCard from './components/LoginCard';
import QuestionBox from './components/QuestionBox';
import ResultBox from './components/ResultBox';
import ResumeModal from './components/ResumeModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('ID');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Cek resume hanya saat komponen pertama kali mount
  useEffect(() => {
    const saved = localStorage.getItem('quizState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.questions && Array.isArray(state.questions) && state.questions.length > 0) {
          setShowResumeModal(true);
        }
      } catch (e) {
        console.error('Error parsing localStorage, clearing...', e);
        localStorage.removeItem('quizState');
      }
    }
  }, []);

  // Fungsi untuk melanjutkan dari data sebelumnya
  const resumeQuiz = () => {
    const saved = localStorage.getItem('quizState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.questions && Array.isArray(state.questions) && state.questions.length > 0) {
          setUsername(state.username || '');
          setLanguage(state.language || 'ID');
          setQuestions(state.questions);
          setUserAnswers(state.userAnswers || []);
          setCurrentQuestionIndex(state.currentQuestionIndex || 0);
          setTimer(state.timer || 15);
          setShowResult(state.showResult || false);
          setIsLoggedIn(true);
          if (!state.showResult && state.timer > 0) {
            setIsTimerRunning(true);
          }
          setShowResumeModal(false);
        } else {
          localStorage.removeItem('quizState');
          setShowResumeModal(false);
        }
      } catch (e) {
        console.error('Error parsing localStorage, clearing...', e);
        localStorage.removeItem('quizState');
        setShowResumeModal(false);
      }
    }
  };

  // Fungsi untuk memulai ulang (hapus data lama)
  const startNewQuiz = () => {
    localStorage.removeItem('quizState');
    setShowResumeModal(false);
  };

  // 🔥 Simpan data ke localStorage saat window hampir ditutup
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isLoggedIn && questions.length > 0) {
        localStorage.setItem('quizState', JSON.stringify({
          username,
          language,
          questions,
          userAnswers,
          currentQuestionIndex,
          timer,
          showResult
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoggedIn, questions, userAnswers, currentQuestionIndex, timer, showResult, language, username]);

  // Simpan data ke localStorage saat state berubah (jika user login)
  useEffect(() => {
    if (isLoggedIn && questions.length > 0) {
      localStorage.setItem('quizState', JSON.stringify({
        username,
        language,
        questions,
        userAnswers,
        currentQuestionIndex,
        timer,
        showResult
      }));
    }
  }, [isLoggedIn, questions, userAnswers, currentQuestionIndex, timer, showResult, language, username]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=3&category=27&difficulty=easy&type=boolean');
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
        setUserAnswers(Array(data.results.length).fill(null));
        setCurrentQuestionIndex(0);
        setTimer(15);
        setIsTimerRunning(true);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Gagal memuat soal. Coba lagi nanti.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
      fetchQuestions();
    } else {
      alert('Masukkan nama pengguna!');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar? Data akan hilang.')) {
      setIsLoggedIn(false);
      setUsername('');
      setQuestions([]);
      setUserAnswers([]);
      setCurrentQuestionIndex(0);
      setTimer(15);
      setIsTimerRunning(false);
      setShowResult(false);
      localStorage.removeItem('quizState');
    }
  };

  const handleAnswerClick = (answer) => {
    if (userAnswers[currentQuestionIndex] !== null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(15);
      } else {
        setShowResult(true);
        setIsTimerRunning(false);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setTimer(15);
    setIsTimerRunning(true);
    setShowResult(false);
    localStorage.removeItem('quizState');
    fetchQuestions();
  };

  // 🔥 Perbaikan: Jika timer habis, tampilkan hasil
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowResult(true);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning]);

  // 🔥 Tambahkan event listener keyboard (T/F)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showResult) return;
      if (userAnswers[currentQuestionIndex] !== null) return;

      if (e.key === 't' || e.key === 'T') {
        handleAnswerClick('True');
      } else if (e.key === 'f' || e.key === 'F') {
        handleAnswerClick('False');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showResult, userAnswers, currentQuestionIndex, handleAnswerClick]);

  // 🔥 Pindahkan useMemo ke sini, sebelum if statement
  const QuizCardInternal = useMemo(() => {
    return () => {
      const currentQuestion = questions[currentQuestionIndex];
      const decodedQuestion = currentQuestion
        ? new DOMParser().parseFromString(currentQuestion.question, 'text/html').body.textContent
        : '';

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
              <div>{language === 'ID' ? 'Terjawab:' : 'Answered:'} {Array.isArray(userAnswers) ? userAnswers.filter(a => a !== null).length : 0}/{questions.length}</div>
              <div>{language === 'ID' ? 'Sisa Waktu:' : 'Time Left:'} 00:{timer < 10 ? '0' : ''}{timer}</div>
            </div>
          </div>

          {showResult ? (
            <ResultBox
              language={language}
              username={username}
              questions={questions}
              userAnswers={userAnswers}
              resetQuiz={resetQuiz}
            />
          ) : (
            <QuestionBox
              question={decodedQuestion}
              userAnswers={userAnswers}
              currentQuestionIndex={currentQuestionIndex}
              handleAnswerClick={handleAnswerClick}
              language={language}
              currentQuestion={currentQuestion}
            />
          )}

          <button className="reset-btn" onClick={() => window.location.reload()}>
            {language === 'ID' ? 'Reset' : 'Reset'}
          </button>
        </div>
      );
    };
  }, [language, username, questions, userAnswers, timer, showResult, currentQuestionIndex, handleLogout, resetQuiz, handleAnswerClick]);

  // 🔥 Tampilkan modal jika showResumeModal = true
  if (showResumeModal) {
    return (
      <div className="App">
        <ResumeModal
          onContinue={resumeQuiz}
          onStartNew={startNewQuiz}
        />
      </div>
    );
  }

  // Jika belum login, tampilkan login
  if (!isLoggedIn) {
    return (
      <div className="App">
        <LoginCard
          language={language}
          setLanguage={setLanguage}
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  // Jika login tapi questions belum siap, tampilkan loading
  if (questions.length === 0) {
    return <div className="App">Memuat soal...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div className="App">Memuat soal...</div>;
  }

  // Gunakan QuizCardInternal
  return (
    <div className="App">
      {QuizCardInternal()}
    </div>
  );
}

export default App;