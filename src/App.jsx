import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import WelcomePage from "@/pages/WelcomePage";
import AssessmentPage from "@/pages/AssessmentPage";
import PaymentPage from "@/pages/PaymentPage";
import ReportPage from "@/pages/ReportPage";

function App() {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [userProfile, setUserProfile] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleStart = () => {
    setCurrentStep("assessment");
  };

  const handleAssessmentComplete = (profile) => {
    setUserProfile(profile);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setCurrentStep("report");
  };

  const handleStartOver = () => {
    setCurrentStep("welcome");
    setUserProfile(null);
    setPaymentComplete(false);
  };

  const handleBackToAssessment = () => {
    setCurrentStep("assessment");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomePage onStart={handleStart} />;
      case "assessment":
        return <AssessmentPage onComplete={handleAssessmentComplete} />;
      case "payment":
        return (
          <PaymentPage 
            onPaymentSuccess={handlePaymentSuccess}
            onBack={handleBackToAssessment}
          />
        );
      case "report":
        return (
          <ReportPage 
            userProfile={userProfile}
            onStartOver={handleStartOver}
          />
        );
      default:
        return <WelcomePage onStart={handleStart} />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={renderCurrentStep()} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;