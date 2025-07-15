import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import ProgressBar from "@/components/molecules/ProgressBar";

const Header = ({ currentStep, totalSteps, showProgress = false }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Stethoscope" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">NursePathway</h1>
              <p className="text-xs text-gray-600">International Licensure Guide</p>
            </div>
          </div>
          
          {showProgress && (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <ProgressBar 
                current={currentStep} 
                total={totalSteps} 
                className="w-32"
              />
            </div>
          )}
        </div>
        
        {showProgress && (
          <div className="md:hidden pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-primary font-medium">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <ProgressBar current={currentStep} total={totalSteps} />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;