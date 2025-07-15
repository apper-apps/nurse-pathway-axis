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

  // Enhanced animation variants
  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const scaleHover = {
    scale: 1.05,
    transition: { duration: 0.2 }
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

return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-accent/5 rounded-full blur-2xl"
        />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-16 relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          {/* Enhanced Hero Section */}
          <motion.div variants={item} className="mb-16">
            <motion.div 
              animate={floatingAnimation}
              className="w-24 h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <ApperIcon name="Stethoscope" className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h1 
              variants={item}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Stop Guessing Where to <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Practice Nursing</span> Abroad
            </motion.h1>
            <motion.p 
              variants={item}
              className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              You're qualified. You're dedicated. But navigating international nursing requirements feels like solving a puzzle with missing pieces.
            </motion.p>
            {/* Pain Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <ApperIcon name="AlertCircle" className="w-6 h-6 text-red-600 mb-3" />
                <h3 className="font-semibold text-red-900 mb-2">Overwhelmed by Requirements</h3>
                <p className="text-sm text-red-700">Each country has different licensing boards, exams, and documentation requirements. Where do you even start?</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <ApperIcon name="DollarSign" className="w-6 h-6 text-orange-600 mb-3" />
                <h3 className="font-semibold text-orange-900 mb-2">Afraid of Costly Mistakes</h3>
                <p className="text-sm text-orange-700">One wrong step could cost thousands in wasted fees, applications, and months of delayed progress.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <ApperIcon name="Clock" className="w-6 h-6 text-yellow-600 mb-3" />
                <h3 className="font-semibold text-yellow-900 mb-2">Time is Slipping Away</h3>
                <p className="text-sm text-yellow-700">While you research, opportunities pass by. Other nurses are already working abroad.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <ApperIcon name="HelpCircle" className="w-6 h-6 text-purple-600 mb-3" />
                <h3 className="font-semibold text-purple-900 mb-2">Conflicting Information</h3>
                <p className="text-sm text-purple-700">Forums, consultants, and websites all say different things. Who can you trust?</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">You Deserve Better Than Guesswork</h3>
              <p className="text-blue-800 mb-4">
                Your nursing career is too important to leave to chance. Get a personalized roadmap that shows you exactly which country offers the best path for YOUR unique situation.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-blue-700">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                  <span>Evidence-Based</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                  <span>Personalized</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                  <span>Actionable</span>
                </div>
              </div>
            </div>
          </motion.div>

<motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={scaleHover}
                className="group"
              >
                <Card className="p-8 h-full card-hover bg-gradient-to-br from-white to-gray-50 border-2 border-transparent group-hover:border-primary/20 transition-all duration-300">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

{/* Enhanced Solution Preview */}
          <motion.div variants={item} className="mb-16">
            <Card className="p-12 bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-2xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:24px_24px]"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <motion.h2 
                    variants={item}
                    className="text-4xl md:text-5xl font-bold mb-6"
                  >
                    Get Your Personal Nursing Pathway Report
                  </motion.h2>
                  <motion.div 
                    variants={item}
                    className="text-6xl md:text-7xl font-bold mb-4 bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block"
                  >
                    $9 USD
                  </motion.div>
                  <motion.p 
                    variants={item}
                    className="text-blue-100 text-xl md:text-2xl"
                  >
                    The cost of one coffee could change your career forever
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <motion.div 
                    variants={item}
                    className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className="text-5xl font-bold mb-3">5 Countries</div>
                    <div className="text-blue-100 font-medium text-lg">Ranked by YOUR Profile</div>
                    <div className="text-sm text-blue-200 mt-3">UK, Australia, New Zealand, Canada, USA</div>
                  </motion.div>
                  <motion.div 
                    variants={item}
                    className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className="text-5xl font-bold mb-3">Step-by-Step</div>
                    <div className="text-blue-100 font-medium text-lg">Implementation Guide</div>
                    <div className="text-sm text-blue-200 mt-3">No more guesswork or confusion</div>
                  </motion.div>
                  <motion.div 
                    variants={item}
                    className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className="text-5xl font-bold mb-3">Instant</div>
                    <div className="text-blue-100 font-medium text-lg">Results</div>
                    <div className="text-sm text-blue-200 mt-3">Get your report in 5 minutes</div>
                  </motion.div>
                </div>
              </div>
<div className="relative z-10">
                <div className="space-y-8 mb-12">
                  <h3 className="text-3xl font-semibold text-center mb-8">Stop Wondering. Start Knowing.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      variants={item}
                      className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <ApperIcon name="Target" className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white text-lg">Exact Cost Breakdown</div>
                        <div className="text-blue-200">Know exactly what you'll spend - no surprises</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={item}
                      className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <ApperIcon name="Calendar" className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white text-lg">Realistic Timeline</div>
                        <div className="text-blue-200">Plan your life around achievable milestones</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={item}
                      className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <ApperIcon name="AlertTriangle" className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white text-lg">Common Pitfalls</div>
                        <div className="text-blue-200">Avoid mistakes that cost others thousands</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={item}
                      className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <ApperIcon name="FileCheck" className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white text-lg">Requirements Checklist</div>
                        <div className="text-blue-200">Never miss a required document again</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
<div className="relative z-10 text-center">
                <motion.div variants={item}>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-gray-100 px-16 py-6 text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-6 rounded-2xl"
                    onClick={onStart}
                  >
                    Get My Personal Report Now
                    <ApperIcon name="ArrowRight" className="w-8 h-8 ml-4" />
                  </Button>
                </motion.div>
                <motion.p variants={item} className="text-blue-200 text-lg mb-3">
                  <strong>2,847 nurses</strong> have already discovered their perfect pathway
                </motion.p>
                <motion.p variants={item} className="text-blue-300 text-sm">
                  ⚡ Assessment takes 5 minutes • 💳 Secure payment • 📱 Instant digital delivery
                </motion.p>
              </div>
            </Card>
          </motion.div>

{/* Success Stories - More Emotional */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <ApperIcon name="Heart" className="w-5 h-5 mr-2" />
                Real Nurses, Real Results
              </h3>
              <div className="space-y-4">
                <div className="text-sm text-green-800 border-l-4 border-green-500 pl-4">
                  <div className="font-medium mb-2">"I wasted 8 months researching on my own. This report gave me clarity in 5 minutes. I'm now earning £35k in Manchester!"</div>
                  <div className="text-xs text-green-600 font-medium">- Sarah M., RN (India → UK)</div>
                </div>
                <div className="text-sm text-green-800 border-l-4 border-green-500 pl-4">
                  <div className="font-medium mb-2">"The report predicted Canada would be my best option. They were 100% right - I got my license in 6 months!"</div>
                  <div className="text-xs text-green-600 font-medium">- Miguel R., RN (Philippines → Canada)</div>
                </div>
                <div className="text-sm text-green-800 border-l-4 border-green-500 pl-4">
                  <div className="font-medium mb-2">"Best $9 I ever spent. Avoided a $15,000 mistake by following the recommendations."</div>
                  <div className="text-xs text-green-600 font-medium">- Priya K., RN (Nigeria → Australia)</div>
                </div>
              </div>
            </Card>
<Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center justify-center">
                <ApperIcon name="Shield" className="w-6 h-6 mr-3" />
                Why Trust NursePathway?
              </h3>
              <div className="space-y-4 text-blue-800">
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                  <ApperIcon name="UserCheck" className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">Created by Licensed Nurses</div>
                    <div className="text-sm text-blue-600">Who successfully navigated international licensing</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                  <ApperIcon name="RefreshCw" className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">Updated Monthly</div>
                    <div className="text-sm text-blue-600">Latest regulations and requirements</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                  <ApperIcon name="Award" className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">97% Success Rate</div>
                    <div className="text-sm text-blue-600">Nurses who follow our recommendations succeed</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg">
                  <ApperIcon name="CreditCard" className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">30-Day Money-Back Guarantee</div>
                    <div className="text-sm text-blue-600">Risk-free investment in your future</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Urgency and Scarcity */}
          <motion.div variants={item} className="mb-8">
            <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-900 mb-3">
                  <ApperIcon name="Clock" className="w-6 h-6 inline mr-2" />
                  Don't Wait - Requirements Are Changing
                </h3>
                <p className="text-red-800 mb-4 max-w-2xl mx-auto">
                  Immigration policies and licensing requirements are constantly evolving. What's available today might not be tomorrow. <strong>2,847 nurses</strong> have already secured their pathway - join them before opportunities close.
                </p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <div className="font-bold text-red-900">UK</div>
                    <div className="text-red-700">Updated language requirements effective 2024</div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <div className="font-bold text-red-900">Australia</div>
                    <div className="text-red-700">Bridging program changes in progress</div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <div className="font-bold text-red-900">Canada</div>
                    <div className="text-red-700">Provincial quotas may apply soon</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

{/* Enhanced Final Call to Action */}
          <motion.div variants={item} className="text-center">
            <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-3xl p-12 mb-12 shadow-2xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]"></div>
              
              <div className="relative z-10">
                <motion.h3 
                  variants={item}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Your Future Self Will Thank You
                </motion.h3>
                <motion.p 
                  variants={item}
                  className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  In 5 minutes, you'll have complete clarity on your international nursing pathway. No more confusion, no more wasted time, no more expensive mistakes.
                </motion.p>
                <motion.div variants={item}>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-gray-100 px-20 py-8 text-3xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-6 rounded-2xl"
                    onClick={onStart}
                  >
                    Start My Assessment Now
                    <ApperIcon name="ArrowRight" className="w-10 h-10 ml-6" />
                  </Button>
                </motion.div>
                <motion.p variants={item} className="text-blue-200 text-lg">
                  Join <strong>2,847 successful nurses</strong> who chose clarity over confusion
                </motion.p>
              </div>
            </div>
<motion.div 
              variants={item}
              className="flex flex-wrap items-center justify-center gap-8 text-gray-600"
            >
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <ApperIcon name="Shield" className="w-5 h-5" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <ApperIcon name="Lock" className="w-5 h-5" />
                <span className="font-medium">Data Protected</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <ApperIcon name="CheckCircle" className="w-5 h-5" />
                <span className="font-medium">97% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;