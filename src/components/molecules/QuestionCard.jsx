import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";

const QuestionCard = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-8 max-w-2xl mx-auto">
        {children}
      </Card>
    </motion.div>
  );
};

export default QuestionCard;