import { useState } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import QuestionCard from "@/components/molecules/QuestionCard";
import ApperIcon from "@/components/ApperIcon";

const QuestionRenderer = ({ question, onAnswer, onBack, canGoBack, mode = "step-by-step" }) => {
  const [answer, setAnswer] = useState("");
  const [scores, setScores] = useState({
    Reading: "",
    Writing: "",
    Speaking: "",
    Listening: ""
  });

  // Single page form state
  const [singlePageAnswers, setSinglePageAnswers] = useState({
    educationCountry: "",
    englishEducation: "",
    englishTestTaken: "",
    englishTestType: "",
    testScores: {
      Reading: "",
      Writing: "",
      Speaking: "",
      Listening: ""
    },
    educationLevel: "",
    hasLicense: "",
    yearsExperience: "",
    recentPractice: "",
    countryPreferences: "",
    priorityPreferences: ""
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

  const handleSinglePageSubmit = () => {
    // Validate all required fields
    const isAllValid = validateSinglePageForm();
    if (isAllValid) {
      // Transform data to match the expected profile format
      const profileData = {
        educationCountry: singlePageAnswers.educationCountry,
        englishEducation: singlePageAnswers.englishEducation,
        englishTest: singlePageAnswers.englishTestType,
        testScores: singlePageAnswers.testScores,
        educationLevel: singlePageAnswers.educationLevel,
        hasLicense: singlePageAnswers.hasLicense,
        yearsExperience: singlePageAnswers.yearsExperience,
        recentPractice: singlePageAnswers.recentPractice,
        countryPreferences: singlePageAnswers.countryPreferences,
        priorityPreferences: singlePageAnswers.priorityPreferences
      };
      onAnswer(profileData);
    }
  };

  const validateSinglePageForm = () => {
    const required = [
      'educationCountry',
      'englishEducation',
      'educationLevel',
      'hasLicense',
      'yearsExperience',
      'recentPractice',
      'countryPreferences',
      'priorityPreferences'
    ];

    // Check if English test details are needed
    if (singlePageAnswers.englishEducation === 'no' || 
        (singlePageAnswers.englishEducation === 'yes' && singlePageAnswers.englishTestTaken === 'no')) {
      required.push('englishTestType');
    }

    // Check if test scores are needed
    if (singlePageAnswers.englishTestTaken === 'yes') {
      const scoresValid = Object.values(singlePageAnswers.testScores).every(score => 
        score !== "" && !isNaN(score) && score >= 0 && score <= 9
      );
      if (!scoresValid) return false;
    }

    return required.every(field => singlePageAnswers[field] !== "");
  };

  const updateSinglePageAnswer = (field, value) => {
    setSinglePageAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTestScore = (section, value) => {
    setSinglePageAnswers(prev => ({
      ...prev,
      testScores: {
        ...prev.testScores,
        [section]: value
      }
    }));
  };

  const renderSinglePageForm = () => {
    return (
      <QuestionCard>
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nursing Pathway Assessment</h2>
            <p className="text-gray-600">Complete all sections to get your personalized recommendations</p>
          </div>

          {/* Education Background Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Education Background</h3>
            
            <FormField
              label="Which country or region did you complete your nursing education?"
              type="select"
              options={["Philippines", "India", "UK", "Canada", "USA", "Other"]}
              value={singlePageAnswers.educationCountry}
              onChange={(e) => updateSinglePageAnswer('educationCountry', e.target.value)}
              required
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Was your nursing education taught in English?
              </label>
              <div className="space-y-2">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="englishEducation"
                      value={option.toLowerCase()}
                      checked={singlePageAnswers.englishEducation === option.toLowerCase()}
                      onChange={(e) => updateSinglePageAnswer('englishEducation', e.target.value)}
                      className="radio-custom"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <FormField
              label="What is the highest nursing qualification you have completed?"
              type="select"
              options={["Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate"]}
              value={singlePageAnswers.educationLevel}
              onChange={(e) => updateSinglePageAnswer('educationLevel', e.target.value)}
              required
            />
          </div>

          {/* English Proficiency Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">English Proficiency</h3>
            
            {(singlePageAnswers.englishEducation === 'yes') && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Have you already taken an English proficiency test?
                </label>
                <div className="space-y-2">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="englishTestTaken"
                        value={option.toLowerCase()}
                        checked={singlePageAnswers.englishTestTaken === option.toLowerCase()}
                        onChange={(e) => updateSinglePageAnswer('englishTestTaken', e.target.value)}
                        className="radio-custom"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {(singlePageAnswers.englishEducation === 'no' || 
              (singlePageAnswers.englishEducation === 'yes' && singlePageAnswers.englishTestTaken === 'no')) && (
              <FormField
                label="Which English test do you plan to take?"
                type="select"
                options={["IELTS", "OET", "TOEFL", "PTE"]}
                value={singlePageAnswers.englishTestType}
                onChange={(e) => updateSinglePageAnswer('englishTestType', e.target.value)}
                required
              />
            )}

            {(singlePageAnswers.englishTestTaken === 'yes' || 
              singlePageAnswers.englishTestType !== '') && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Enter your expected scores for each section
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Reading', 'Writing', 'Speaking', 'Listening'].map((section) => (
                    <FormField
                      key={section}
                      label={section}
                      type="number"
                      placeholder="0.0 - 9.0"
                      min="0"
                      max="9"
                      step="0.5"
                      value={singlePageAnswers.testScores[section]}
                      onChange={(e) => updateTestScore(section, e.target.value)}
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
            )}
          </div>

          {/* Professional Experience Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Experience</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Do you currently hold a valid RN license in your home country?
              </label>
              <div className="space-y-2">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="hasLicense"
                      value={option.toLowerCase()}
                      checked={singlePageAnswers.hasLicense === option.toLowerCase()}
                      onChange={(e) => updateSinglePageAnswer('hasLicense', e.target.value)}
                      className="radio-custom"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <FormField
              label="How many years of RN practice experience do you have?"
              type="select"
              options={["None", "<1 year", "1–3 years", "4+ years"]}
              value={singlePageAnswers.yearsExperience}
              onChange={(e) => updateSinglePageAnswer('yearsExperience', e.target.value)}
              required
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Have you practiced nursing within the last 4 years?
              </label>
              <div className="space-y-2">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="recentPractice"
                      value={option.toLowerCase()}
                      checked={singlePageAnswers.recentPractice === option.toLowerCase()}
                      onChange={(e) => updateSinglePageAnswer('recentPractice', e.target.value)}
                      className="radio-custom"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Preferences</h3>
            
            <FormField
              label="Do you have any preferred countries or regions?"
              type="select"
              options={["UK", "Australia", "New Zealand", "Canada", "USA", "No preference"]}
              value={singlePageAnswers.countryPreferences}
              onChange={(e) => updateSinglePageAnswer('countryPreferences', e.target.value)}
              required
            />

            <FormField
              label="What is most important to you in choosing a pathway?"
              type="select"
              options={["Fastest timeline", "Lowest cost", "Easiest requirements", "Best job opportunities", "No preference"]}
              value={singlePageAnswers.priorityPreferences}
              onChange={(e) => updateSinglePageAnswer('priorityPreferences', e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleSinglePageSubmit} 
              disabled={!validateSinglePageForm()}
              className="px-8 py-3 text-lg"
            >
              Complete Assessment
              <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </QuestionCard>
    );
  };

  // Return single page form if mode is single-page
  if (mode === "single-page") {
    return renderSinglePageForm();
  }

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