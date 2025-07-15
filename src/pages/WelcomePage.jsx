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
              <h2 className="text-2xl font-bold mb-4">
                Professional Assessment - $9 USD
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Top 5</div>
                  <div className="text-blue-100">Recommendations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Personalized</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Report Access</div>
                </div>
              </div>
              <p className="text-blue-100 mb-6">
                One-time payment for comprehensive analysis of your nursing career opportunities
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                onClick={onStart}
              >
                Start Your Assessment
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
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
                <span>Trusted by 1000+ Nurses</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;