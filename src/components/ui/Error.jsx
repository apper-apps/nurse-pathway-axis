import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center py-12"
    >
      <div className="bg-red-50 rounded-2xl p-8 mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">
          {message || "An unexpected error occurred. Please try again."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary text-white px-6 py-2 rounded-lg font-medium inline-flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCcw" className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;