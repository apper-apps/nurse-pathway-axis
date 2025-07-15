import { useState } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import QuestionCard from "@/components/molecules/QuestionCard";
import ApperIcon from "@/components/ApperIcon";

const QuestionRenderer = ({ question, onAnswer, onBack, canGoBack }) => {
  const [answer, setAnswer] = useState("");
  const [scores, setScores] = useState({
    Reading: "",
    Writing: "",
    Speaking: "",
    Listening: ""
  });

  const handleSubmit = () => {
    if (question.type === "form") {
      const allScoresValid = Object.values(scores).every(score => 
        score !== "" && !isNaN(score) && score >= 0 && score <= 9
      );
      if (allScoresValid) {
        onAnswer(scores);
      }
    } else if (answer) {
      onAnswer(answer);
    }
  };

  const handleScoreChange = (section, value) => {
    setScores(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const isValid = () => {
    if (question.type === "form") {
      return Object.values(scores).every(score => 
        score !== "" && !isNaN(score) && score >= 0 && score <= 9
      );
    }
    return answer !== "";
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "select":
        return (
          <FormField
            label={question.question}
            type="select"
            options={question.options}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        );

      case "boolean":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {question.question}
            </h3>
            <div className="space-y-3">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="boolean-answer"
                    value={option.toLowerCase()}
                    checked={answer === option.toLowerCase()}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="radio-custom"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "form":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {question.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(question.fields).map((field) => (
                <FormField
                  key={field}
                  label={field}
                  type="number"
                  placeholder="0.0 - 9.0"
                  min="0"
                  max="9"
                  step="0.5"
                  value={scores[field]}
                  onChange={(e) => handleScoreChange(field, e.target.value)}
                  required
                />
              ))}
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
              <p className="font-medium mb-2">Scoring Guidelines:</p>
              <ul className="space-y-1 text-sm">
                <li>• Enter your actual or expected scores</li>
                <li>• Scores should be between 0.0 and 9.0</li>
                <li>• Use increments of 0.5 (e.g., 6.0, 6.5, 7.0)</li>
              </ul>
            </div>
          </div>
        );

      case "final":
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <ApperIcon name="CheckCircle" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Assessment Complete!
            </h3>
            <p className="text-gray-600">
              {question.question}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (question.type === "final") {
    return (
      <QuestionCard>
        {renderQuestionContent()}
        <div className="flex justify-between items-center pt-6">
          {canGoBack && (
            <Button variant="outline" onClick={onBack}>
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button onClick={handleSubmit} className="ml-auto">
            Continue to Payment
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </QuestionCard>
    );
  }

  return (
    <QuestionCard>
      {renderQuestionContent()}
      <div className="flex justify-between items-center pt-6">
        {canGoBack && (
          <Button variant="outline" onClick={onBack}>
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button 
          onClick={handleSubmit} 
          disabled={!isValid()}
          className="ml-auto"
        >
          Next
          <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </QuestionCard>
  );
};

export default QuestionRenderer;