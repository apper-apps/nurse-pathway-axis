import { useQuestionFlow } from "@/hooks/useQuestionFlow";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUserProfile } from '@/store/userSlice';
import { createUserProfile, updateUserProfile, getUserProfile } from '@/services/api/userProfileService';
import Header from "@/components/organisms/Header";
import QuestionRenderer from "@/components/organisms/QuestionRenderer";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useEffect, useState } from 'react';
const AssessmentPage = ({ onComplete }) => {
  const dispatch = useDispatch();
  const { user, currentUserProfile } = useSelector((state) => state.user);
  const [profileLoading, setProfileLoading] = useState(true);
  
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

  // Load existing user profile on component mount
  useEffect(() => {
    const loadExistingProfile = async () => {
      if (user && user.userId) {
        try {
          setProfileLoading(true);
          const existingProfile = await getUserProfile(user.userId);
          if (existingProfile) {
            dispatch(setCurrentUserProfile(existingProfile));
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfileLoading(false);
      }
    };

    loadExistingProfile();
  }, [user, dispatch]);

const handleAnswer = async (answer) => {
    answerQuestion(answer);
    
    if (currentQuestion?.type === "final") {
      const profileData = getUserProfile();
      
      try {
        let savedProfile;
        if (currentUserProfile && currentUserProfile.Id) {
          // Update existing profile
          savedProfile = await updateUserProfile(currentUserProfile.Id, profileData);
        } else {
          // Create new profile
          savedProfile = await createUserProfile(profileData);
        }
        
        if (savedProfile) {
          dispatch(setCurrentUserProfile(savedProfile));
        }
        
        // Navigate to payment page after assessment completion
        navigate('/payment');
      } catch (error) {
        console.error("Error saving user profile:", error);
        // Still proceed with assessment completion even if profile save fails
        navigate('/payment');
      }
    }
  };

  const navigate = useNavigate();

if (loading || profileLoading) {
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
        currentStep={1}
        totalSteps={1}
        showProgress={false}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <QuestionRenderer
          mode="single-page"
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default AssessmentPage;