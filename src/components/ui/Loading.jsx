import { motion } from "framer-motion";

const Loading = ({ type = "form" }) => {
  if (type === "form") {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-card">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded-lg shimmer"></div>
            <div className="h-4 bg-gray-200 rounded-lg shimmer w-3/4"></div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg shimmer"></div>
            <div className="h-12 bg-gray-200 rounded-lg shimmer"></div>
            <div className="h-12 bg-gray-200 rounded-lg shimmer w-2/3"></div>
          </div>
          <div className="flex justify-between pt-4">
            <div className="h-10 w-24 bg-gray-200 rounded-lg shimmer"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "report") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-card p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-32 bg-gray-200 rounded-lg shimmer"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded shimmer"></div>
                  <div className="h-3 bg-gray-200 rounded shimmer w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded shimmer w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;