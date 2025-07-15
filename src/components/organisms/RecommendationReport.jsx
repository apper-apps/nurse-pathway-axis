import { motion } from "framer-motion";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const generatePDF = async (element, filename) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF generation failed:', error);
    return false;
  }
};

const RecommendationReport = ({ recommendations, userProfile, onStartOver }) => {
  const handleExportPDF = async () => {
    const reportElement = document.getElementById('recommendation-report');
    if (!reportElement) {
      toast.error('Unable to generate PDF. Please try again.');
      return;
    }

    toast.info('Generating PDF...');
    
    const success = await generatePDF(reportElement, 'nursing-licensure-recommendations.pdf');
    
    if (success) {
      toast.success('PDF exported successfully!');
    } else {
      toast.error('Failed to export PDF. Please try again.');
    }
  };
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
      id="recommendation-report"
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
          <div className="space-y-8">
            {recommendations.map((rec, index) => (
              <motion.div key={index} variants={item}>
                <Card className="p-8 border-l-4 border-l-primary shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {rec.country}
                        </h3>
                        {rec.region && (
                          <p className="text-sm text-gray-600 mt-1">{rec.region}</p>
                        )}
                        <div className="flex items-center mt-2">
                          <div className="text-3xl font-bold text-primary mr-2">
                            {rec.score}%
                          </div>
                          <div className="text-sm text-gray-500">Compatibility Match</div>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(rec.difficulty)}`}>
                      {rec.difficulty} Difficulty
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <ApperIcon name="Clock" className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-900">
                        {rec.timeline}
                      </div>
                      <div className="text-sm text-blue-700">Expected Timeline</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <ApperIcon name="DollarSign" className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-900">
                        ${rec.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700">Total Investment</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <ApperIcon name="TrendingUp" className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-purple-900">
                        {rec.jobMarket}
                      </div>
                      <div className="text-sm text-purple-700">Job Market</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <ApperIcon name="FileCheck" className="w-5 h-5 text-primary mr-2" />
                        Step-by-Step Implementation Guide
                      </h4>
                      <div className="space-y-4">
                        {rec.implementationSteps?.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-1">{step.title}</h5>
                              <p className="text-sm text-gray-700 mb-2">{step.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span className="flex items-center">
                                  <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
                                  {step.timeframe}
                                </span>
                                <span className="flex items-center">
                                  <ApperIcon name="DollarSign" className="w-3 h-3 mr-1" />
                                  ${step.cost}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-500 mr-2" />
                        Essential Requirements Checklist
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {rec.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-start space-x-3 p-3 bg-white border rounded-lg">
                            <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-medium">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <ApperIcon name="AlertTriangle" className="w-5 h-5 text-yellow-500 mr-2" />
                        Common Challenges & Solutions
                      </h4>
                      <div className="space-y-3">
                        {rec.challenges?.map((challenge, challengeIndex) => (
                          <div key={challengeIndex} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold text-yellow-900 mb-1">{challenge.issue}</h5>
                                <p className="text-sm text-yellow-800">{challenge.solution}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <ApperIcon name="Users" className="w-5 h-5 mr-2" />
                What Our Users Say
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">"This guide saved me months of research. The step-by-step approach made the UK licensing process so much clearer."</p>
                      <div className="text-xs text-gray-600">- Sarah M., RN (Philippines → UK)</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">"The personalized recommendations helped me choose Australia over Canada. Now I'm successfully working in Melbourne!"</p>
                      <div className="text-xs text-gray-600">- Michael R., RN (India → Australia)</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <ApperIcon name="Shield" className="w-5 h-5 mr-2" />
                Professional Guarantee
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle2" className="w-4 h-4 text-blue-600" />
                  <span>Updated monthly with latest regulations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle2" className="w-4 h-4 text-blue-600" />
                  <span>Verified by licensed nurses in each country</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle2" className="w-4 h-4 text-blue-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Button 
              onClick={handleExportPDF}
              variant="outline" 
              className="w-full mb-4 bg-gradient-to-r from-primary to-secondary text-white border-none hover:shadow-lg"
            >
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export Professional Report
            </Button>
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