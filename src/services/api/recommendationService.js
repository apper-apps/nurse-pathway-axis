import recommendationsData from "@/services/mockData/recommendations.json";

export const generateRecommendations = async (userProfile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const countries = Object.keys(recommendationsData);
      const recommendations = [];

      countries.forEach(countryKey => {
        const country = recommendationsData[countryKey];
        let score = calculateScore(userProfile, country, countryKey);
        
        recommendations.push({
          country: country.country,
          region: country.region,
          score: Math.round(score),
          requirements: country.requirements,
          timeline: country.timeline,
          totalCost: country.averageCost,
          difficulty: country.difficulty,
          jobMarket: country.jobMarket
        });
      });

      // Sort by score (highest first) and return top 5
      const sortedRecommendations = recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      resolve(sortedRecommendations);
    }, 1000);
  });
};

const calculateScore = (userProfile, country, countryKey) => {
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

  // Home country education bonus
  if (userProfile.educationCountry === "UK" && countryKey === "UK") {
    score += 20;
  } else if (userProfile.educationCountry === "Canada" && countryKey === "Canada") {
    score += 20;
  } else if (userProfile.educationCountry === "USA" && countryKey === "USA") {
    score += 20;
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
  if (userProfile.countryPreferences && userProfile.countryPreferences.includes(countryKey)) {
    score += 15;
  }

  // Priority-based adjustments
  if (userProfile.priorityPreferences === "Fastest timeline") {
    if (countryKey === "NewZealand") score += 10;
    if (countryKey === "UK") score += 8;
  } else if (userProfile.priorityPreferences === "Lowest cost") {
    if (countryKey === "NewZealand") score += 12;
    if (countryKey === "UK") score += 8;
  } else if (userProfile.priorityPreferences === "Easiest requirements") {
    if (countryKey === "NewZealand") score += 15;
    if (countryKey === "Canada") score += 8;
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