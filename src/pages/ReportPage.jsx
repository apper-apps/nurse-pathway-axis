import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import RecommendationReport from "@/components/organisms/RecommendationReport";
import Header from "@/components/organisms/Header";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { generateRecommendations } from "@/services/api/recommendationService";

const ReportPage = ({ userProfile, onStartOver }) => {
  const { reportId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // If reportId is provided, load specific region data
      const specificRegion = reportId ? parseReportId(reportId) : null;
      const results = await generateRecommendations(userProfile, specificRegion);
      setRecommendations(results);
      
      toast.success("Your personalized recommendations are ready!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [userProfile]);

  const parseReportId = (reportId) => {
    // Parse reportId to determine region type and value
    // This is a simplified example - in production, you'd have a proper mapping
    const regionMap = {
      'uk': { type: 'country', value: 'UK' },
      'australia': { type: 'country', value: 'Australia' },
      'newzealand': { type: 'country', value: 'New Zealand' },
      'alberta': { type: 'province', value: 'Alberta' },
      'bc': { type: 'province', value: 'British Columbia' },
      'ontario': { type: 'province', value: 'Ontario' },
      'california': { type: 'state', value: 'California' },
      'texas': { type: 'state', value: 'Texas' },
      'newyork': { type: 'state', value: 'New York' }
    };
    
    return regionMap[reportId] || null;
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