import { useState, useEffect } from "react";
import { getQuestionFlow, getQuestion, getNextQuestion, getTotalSteps } from "@/services/api/questionService";

export const useQuestionFlow = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [totalSteps, setTotalSteps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeFlow();
  }, []);

  useEffect(() => {
    if (currentQuestionId) {
      loadQuestion(currentQuestionId);
    }
  }, [currentQuestionId]);

  const initializeFlow = async () => {
    try {
      setLoading(true);
      setError(null);
      const steps = await getTotalSteps();
      setTotalSteps(steps);
      await loadQuestion("start");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestion = async (questionId) => {
    try {
      setLoading(true);
      setError(null);
      const question = await getQuestion(questionId);
      setCurrentQuestion(question);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const answerQuestion = async (answer) => {
    try {
      setError(null);
      
      // Save answer
      setAnswers(prev => ({
        ...prev,
        [currentQuestionId]: answer
      }));

      // Add to history
      setQuestionHistory(prev => [
        ...prev,
        { questionId: currentQuestionId, answer }
      ]);

      // Get next question
      const nextQuestionId = await getNextQuestion(currentQuestionId, answer);
      
      if (nextQuestionId) {
        setCurrentQuestionId(nextQuestionId);
      } else {
        // Flow complete
        setCurrentQuestion({ type: "complete" });
        setCurrentQuestionId(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const goBack = () => {
    if (questionHistory.length > 0) {
      const previous = questionHistory[questionHistory.length - 1];
      
      // Remove last entry from history
      setQuestionHistory(prev => prev.slice(0, -1));
      
      // Remove last answer
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestionId];
        return newAnswers;
      });
      
      // Go to previous question
      setCurrentQuestionId(previous.questionId);
    }
  };

  const getCurrentStep = () => {
    return questionHistory.length + 1;
  };

  const canGoBack = () => {
    return questionHistory.length > 0;
  };

  const getUserProfile = () => {
    return {
      educationCountry: answers.start,
      englishEducation: answers.english_language,
      englishTest: answers.ask_english_test || answers.ask_which_test,
      testScores: answers.test_score_input,
      educationLevel: answers.education_level,
      hasLicense: answers.license_status,
      yearsExperience: answers.practice_experience,
      recentPractice: answers.recency_of_practice,
      countryPreferences: answers.country_preferences,
      priorityPreferences: answers.priority_preferences
    };
  };

  const resetFlow = () => {
    setCurrentQuestionId("start");
    setCurrentQuestion(null);
    setQuestionHistory([]);
    setAnswers({});
    setError(null);
  };

  return {
    currentQuestion,
    currentQuestionId,
    loading,
    error,
    totalSteps,
    getCurrentStep,
    canGoBack,
    answerQuestion,
    goBack,
    getUserProfile,
    resetFlow,
    initializeFlow
  };
};