import { useQuestionFlow } from "@/hooks/useQuestionFlow";
import Header from "@/components/organisms/Header";
import QuestionRenderer from "@/components/organisms/QuestionRenderer";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const AssessmentPage = ({ onComplete }) => {
  const {
    currentQuestion,
    loading,
    error,
    totalSteps,
    getCurrentStep,
    canGoBack,
    answerQuestion,
    goBack,
    getUserProfile,
    initializeFlow
  } = useQuestionFlow();

  const handleAnswer = (answer) => {
    answerQuestion(answer);
    
    if (currentQuestion?.type === "final") {
onComplete(getUserProfile());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Loading type="form" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Error message={error} onRetry={initializeFlow} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
      <Header 
        currentStep={getCurrentStep()}
        totalSteps={totalSteps}
        showProgress={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {currentQuestion && (
          <QuestionRenderer
            question={currentQuestion}
            onAnswer={handleAnswer}
            onBack={goBack}
            canGoBack={canGoBack()}
          />
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;