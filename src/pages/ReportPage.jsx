import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import RecommendationReport from "@/components/organisms/RecommendationReport";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { generateRecommendations } from "@/services/api/recommendationService";

const ReportPage = ({ userProfile, onStartOver }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, [userProfile]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await generateRecommendations(userProfile);
      setRecommendations(results);
      
      toast.success("Your personalized recommendations are ready!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Loading type="report" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Error message={error} onRetry={loadRecommendations} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <RecommendationReport
          recommendations={recommendations}
          userProfile={userProfile}
          onStartOver={onStartOver}
        />
      </div>
    </div>
  );
};

export default ReportPage;