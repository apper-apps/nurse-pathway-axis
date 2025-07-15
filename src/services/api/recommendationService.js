import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const generateRecommendations = async (userProfile) => {
  try {
    // First, create or update user profile
    const userProfileId = await createUserProfile(userProfile);
    
    // Then get recommendations
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "country" } },
        { field: { Name: "region" } },
        { field: { Name: "score" } },
        { field: { Name: "requirements" } },
        { field: { Name: "timeline" } },
        { field: { Name: "total_cost" } },
        { field: { Name: "difficulty" } },
        { field: { Name: "job_market" } }
      ],
      orderBy: [{ fieldName: "score", sorttype: "DESC" }],
      pagingInfo: { limit: 5, offset: 0 }
    };
    
    const response = await apperClient.fetchRecords("recommendation", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    // Calculate personalized scores and return recommendations
    const recommendations = response.data.map(rec => {
      const personalizedScore = calculateScore(userProfile, rec);
      return {
        country: rec.country,
        region: rec.region,
        score: Math.round(personalizedScore),
        requirements: rec.requirements ? rec.requirements.split('\n').filter(req => req.trim()) : [],
        timeline: rec.timeline,
        totalCost: rec.total_cost,
        difficulty: rec.difficulty,
        jobMarket: rec.job_market,
        implementationSteps: generateImplementationSteps(rec),
        challenges: generateChallenges(rec)
      };
    });
    
    // Sort by personalized score and return top 5
    return recommendations.sort((a, b) => b.score - a.score).slice(0, 5);
    
  } catch (error) {
    console.error("Error generating recommendations:", error);
    toast.error("Failed to generate recommendations");
    return [];
  }
};

const createUserProfile = async (userProfile) => {
  try {
    const apperClient = getApperClient();
    
    // Map user profile to database fields (only updateable fields)
    const profileData = {
      Name: `Profile_${Date.now()}`,
      education_country: userProfile.educationCountry,
      english_education: userProfile.englishEducation,
      test_scores: userProfile.testScores ? JSON.stringify(userProfile.testScores) : null,
      education_level: userProfile.educationLevel,
      has_license: userProfile.hasLicense,
      years_experience: userProfile.yearsExperience,
      recent_practice: userProfile.recentPractice,
      country_preferences: userProfile.countryPreferences,
      priority_preferences: userProfile.priorityPreferences
    };
    
    const params = {
      records: [profileData]
    };
    
    const response = await apperClient.createRecord("user_profile", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    if (response.results && response.results.length > 0) {
      const successfulRecord = response.results.find(result => result.success);
      return successfulRecord ? successfulRecord.data.Id : null;
    }
    
    return null;
  } catch (error) {
    console.error("Error creating user profile:", error);
    return null;
  }
};

const calculateScore = (userProfile, country) => {
  let score = 60; // Base score
  
  // Education level scoring
  if (userProfile.educationLevel === "Bachelor's Degree") {
    score += 15;
  } else if (userProfile.educationLevel === "Master's Degree") {
    score += 20;
  } else if (userProfile.educationLevel === "Doctorate") {
    score += 25;
  }
  
  // Experience scoring
  if (userProfile.yearsExperience === "4+ years") {
    score += 15;
  } else if (userProfile.yearsExperience === "1–3 years") {
    score += 10;
  } else if (userProfile.yearsExperience === "<1 year") {
    score += 5;
  }
  
  // English test scoring
  if (userProfile.testScores) {
    const avgScore = Object.values(userProfile.testScores)
      .reduce((sum, val) => sum + parseFloat(val), 0) / 4;
    
    if (avgScore >= 7.0) {
      score += 10;
    } else if (avgScore >= 6.5) {
      score += 5;
    }
  }
  
  // Recent practice bonus
  if (userProfile.recentPractice === "yes") {
    score += 10;
  }
  
  // English education bonus
  if (userProfile.englishEducation === "yes") {
    score += 8;
  }
  
  // License status bonus
  if (userProfile.hasLicense === "yes") {
    score += 12;
  }
  
  // Country preference bonus
  if (userProfile.countryPreferences && userProfile.countryPreferences.includes(country.country)) {
    score += 15;
  }
  
  // Difficulty penalty
  if (country.difficulty === "High") {
    score -= 5;
  } else if (country.difficulty === "Low") {
    score += 5;
  }
  
  // Ensure score doesn't exceed 100
  return Math.min(score, 100);
};

const generateImplementationSteps = (country) => {
  // Generate basic implementation steps based on country
  const steps = [
    {
      title: "English Language Test",
      description: "Complete required English proficiency test",
      timeframe: "1-2 months",
      cost: 300
    },
    {
      title: "Document Verification",
      description: "Get credentials verified by authorized agency",
      timeframe: "2-4 weeks",
      cost: 400
    },
    {
      title: "License Application",
      description: "Submit application to nursing regulatory body",
      timeframe: "1-3 months",
      cost: 500
    },
    {
      title: "Assessment/Examination",
      description: "Complete required competency assessment",
      timeframe: "2-6 months",
      cost: 1000
    },
    {
      title: "Final Registration",
      description: "Complete registration process",
      timeframe: "2-4 weeks",
      cost: 200
    }
  ];
  
  return steps;
};

const generateChallenges = (country) => {
  // Generate common challenges based on country
  return [
    {
      issue: "Document processing delays",
      solution: "Submit all documents well in advance and use certified translation services"
    },
    {
      issue: "Complex requirements",
      solution: "Work with professional migration consultants familiar with nursing regulations"
    }
  ];
};