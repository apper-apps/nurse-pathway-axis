import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const RecommendationReport = ({ recommendations, userProfile, onStartOver }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "low": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "high": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8"
    >
      <motion.div variants={item} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="FileCheck" className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Nursing Licensure Recommendations
        </h1>
        <p className="text-lg text-gray-600">
          Based on your profile, here are the top 5 pathways ranked by compatibility
        </p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <motion.div key={index} variants={item}>
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {rec.country}
                        </h3>
                        {rec.region && (
                          <p className="text-sm text-gray-600">{rec.region}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {rec.score}%
                      </div>
                      <div className="text-sm text-gray-500">Match</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">
                        {rec.timeline}
                      </div>
                      <div className="text-sm text-gray-600">Timeline</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">
                        ${rec.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Cost</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Difficulty</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Requirements:</h4>
                    <ul className="space-y-2">
                      {rec.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2">
                          <ApperIcon name="CheckCircle2" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <motion.div variants={item}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Profile Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Education Country:</span>
                  <span className="font-medium">{userProfile.educationCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Education Level:</span>
                  <span className="font-medium">{userProfile.educationLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{userProfile.yearsExperience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">English Test:</span>
                  <span className="font-medium">{userProfile.englishTest}</span>
                </div>
                {userProfile.testScores && (
                  <div className="pt-2 border-t">
                    <div className="text-gray-600 mb-2">Test Scores:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Reading: {userProfile.testScores.Reading}</div>
                      <div>Writing: {userProfile.testScores.Writing}</div>
                      <div>Speaking: {userProfile.testScores.Speaking}</div>
                      <div>Listening: {userProfile.testScores.Listening}</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Have questions about your recommendations? Our team is here to help guide you through the process.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Button 
              onClick={onStartOver} 
              variant="ghost" 
              className="w-full"
            >
              <ApperIcon name="RefreshCcw" className="w-4 h-4 mr-2" />
              Start New Assessment
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecommendationReport;