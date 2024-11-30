import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import CertificateTemplate from "../Components/Quiz/CertificateTemplate";

const Quiz = ({ user }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const timerRef = useRef(null);

  // Fetch quizzes on mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/quiz/quizzes`, {
          withCredentials: true,
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  // Timer management
  useEffect(() => {
    if (isQuizStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      handleSubmitQuiz();
    }
    return () => clearInterval(timerRef.current);
  }, [isQuizStarted, timeLeft]);

  // Start quiz
  const handleQuizStart = (quizId) => {
    const selected = quizzes.find((quiz) => quiz._id === quizId);
    setSelectedQuiz(selected);
    setIsQuizStarted(true);
    setCurrentTopicIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeLeft(300); // Reset timer
  };

  // Handle answer selection
  const handleAnswer = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  // Move to the next question or topic
  const handleNextQuestion = () => {
    if (
      currentQuestionIndex <
      selectedQuiz.topics[currentTopicIndex].questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleNextTopic();
    }
  };

  const handleNextTopic = () => {
    if (currentTopicIndex < selectedQuiz.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  // Submit quiz and calculate result
  const handleSubmitQuiz = () => {
    clearInterval(timerRef.current);

    let correctAnswers = 0;
    selectedQuiz.topics.forEach((topic) => {
      topic.questions.forEach((question, questionIndex) => {
        const selectedAnswerIndex = answers[questionIndex];
        const correctAnswerIndex = question.options.findIndex(
          (option) => option.isCorrect
        );
        if (selectedAnswerIndex === correctAnswerIndex) {
          correctAnswers += 1;
        }
      });
    });

    const totalQuestions = selectedQuiz.topics.reduce(
      (acc, topic) => acc + topic.questions.length,
      0
    );
    const percentage = (correctAnswers / totalQuestions) * 100;

    if (percentage >= 60) {
      setQuizResult({ correctAnswers, totalQuestions, percentage });
      setIsCertificateVisible(true);
    } else {
      alert(`You scored ${correctAnswers}/${totalQuestions}. Percentage: ${percentage.toFixed(2)}%.`);
    }

    setIsQuizStarted(false);
  };

  // Render Certificate
  if (isCertificateVisible && selectedQuiz) {
    return (
      <CertificateTemplate
        user={user}
        selectedQuiz={selectedQuiz}
        quizName={selectedQuiz.courseName}
        percentage={quizResult?.percentage?.toFixed(2)}
        totalQuestions={quizResult?.totalQuestions}
        correctAnswers={quizResult?.correctAnswers}
      />
    );
  }

  // Render available quizzes
  if (!isQuizStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Available Quizzes</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full px-6">
          {quizzes.length === 0 ? (
            <p className="text-center text-lg">No quizzes available.</p>
          ) : (
            quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
              >
                <h2 className="text-2xl font-semibold mb-4">{quiz.courseName}</h2>
                <p className="text-gray-400 mb-4">{quiz.description}</p>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                  onClick={() => handleQuizStart(quiz._id)}
                >
                  Start Quiz
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Render quiz questions
  const currentTopic = selectedQuiz.topics[currentTopicIndex];
  const currentQuestion = currentTopic.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="w-full bg-gray-800 py-4 px-6 text-center text-xl font-bold">
        Quiz: {selectedQuiz.courseName} | Time Left:{" "}
        {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
        {timeLeft % 60}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-semibold mb-4">
          Topic: {currentTopic.name}
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <p className="text-xl mb-4">{currentQuestion.questionText}</p>
          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`py-2 px-4 rounded font-medium text-left ${
                  answers[currentQuestionIndex] === index
                    ? "bg-green-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleAnswer(currentQuestionIndex, index)}
              >
                {option.optionText}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full py-4 bg-gray-800 flex justify-center gap-4">
        {currentQuestionIndex <
        selectedQuiz.topics[currentTopicIndex].questions.length - 1 ? (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        ) : currentTopicIndex < selectedQuiz.topics.length - 1 ? (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            onClick={handleNextTopic}
          >
            Next Topic
          </button>
        ) : (
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        )}
      </footer>
    </div>
  );
};

export default Quiz;
