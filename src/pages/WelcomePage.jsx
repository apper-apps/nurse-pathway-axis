import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const WelcomePage = ({ onStart }) => {
  const features = [
    {
      icon: "Globe",
      title: "5 Country Coverage",
      description: "Get recommendations for UK, Australia, New Zealand, Canada, and USA"
    },
    {
      icon: "Target",
      title: "Personalized Matching",
      description: "AI-powered recommendations based on your unique profile"
    },
    {
      icon: "Clock",
      title: "Fast Assessment",
      description: "Complete your evaluation in just 5-10 minutes"
    },
    {
      icon: "FileText",
      title: "Detailed Report",
      description: "Comprehensive requirements and timeline for each pathway"
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <motion.div variants={item} className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Stethoscope" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="gradient-text">NursePathway</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get personalized recommendations for international nursing licensure across 5 countries. 
              Start your journey to practicing abroad today.
            </p>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card className="p-6 h-full card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

<motion.div variants={item}>
            <Card className="p-8 bg-gradient-to-r from-primary to-secondary text-white mb-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-3">
                  Professional Licensure Assessment
                </h2>
                <div className="text-5xl font-bold mb-2">$9 USD</div>
                <p className="text-blue-100 text-lg">One-time investment in your nursing career</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-3xl font-bold mb-2">Top 5</div>
                  <div className="text-blue-100">Personalized Recommendations</div>
                  <div className="text-xs text-blue-200 mt-1">Ranked by compatibility</div>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-3xl font-bold mb-2">Step-by-Step</div>
                  <div className="text-blue-100">Implementation Guide</div>
                  <div className="text-xs text-blue-200 mt-1">Complete roadmap included</div>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Lifetime Access</div>
                  <div className="text-xs text-blue-200 mt-1">PDF export included</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-center mb-4">What You'll Get:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Detailed cost breakdowns for each country</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Timeline estimates with milestone tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Common challenges and proven solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Essential requirements checklist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Professional PDF report for applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Updated regulatory information</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  onClick={onStart}
                >
                  Get My Professional Assessment
                  <ApperIcon name="ArrowRight" className="w-6 h-6 ml-3" />
                </Button>
                <p className="text-blue-200 text-sm mt-3">
                  Join 2,500+ nurses who've successfully obtained international licenses
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <ApperIcon name="Users" className="w-5 h-5 mr-2" />
                Success Stories
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-green-800">
                  <div className="font-medium">"This assessment was incredibly detailed and accurate. I'm now working in London exactly as predicted!"</div>
                  <div className="text-xs text-green-600 mt-1">- Maria S., RN (Philippines → UK)</div>
                </div>
                <div className="text-sm text-green-800">
                  <div className="font-medium">"The step-by-step guide saved me thousands in consultant fees. Worth every penny!"</div>
                  <div className="text-xs text-green-600 mt-1">- James K., RN (Nigeria → Canada)</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <ApperIcon name="Award" className="w-5 h-5 mr-2" />
                Professional Standards
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle2" className="w-4 h-4 text-blue-600" />
                  <span>Verified by licensed nurses in each country</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle2" className="w-4 h-4 text-blue-600" />
                  <span>Updated monthly with latest regulations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="CheckCircle2" className="w-4 h-4 text-blue-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Lock" className="w-4 h-4" />
                <span>Data Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="CheckCircle" className="w-4 h-4" />
                <span>2,500+ Successful Nurses</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;