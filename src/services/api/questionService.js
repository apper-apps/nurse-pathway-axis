import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const getQuestionFlow = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "question_text" } },
        { field: { Name: "type" } },
        { field: { Name: "options" } },
        { field: { Name: "fields" } },
        { field: { Name: "next" } }
      ],
      orderBy: [{ fieldName: "Id", sorttype: "ASC" }]
    };
    
    const response = await apperClient.fetchRecords("question", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return {};
    }
    
    // Convert to the expected format
    const questionFlow = {};
    response.data.forEach(question => {
      const key = question.Id === 1 ? "start" : `question_${question.Id}`;
      questionFlow[key] = {
        question: question.question_text,
        type: question.type,
        options: question.options ? question.options.split(',').map(opt => opt.trim()) : [],
        fields: question.fields ? JSON.parse(question.fields) : {},
        next: question.next
      };
    });
    
    return questionFlow;
  } catch (error) {
    console.error("Error fetching question flow:", error);
    toast.error("Failed to load questions");
    return {};
  }
};

export const getQuestion = async (questionId) => {
  try {
    const questionFlow = await getQuestionFlow();
    return questionFlow[questionId] || null;
  } catch (error) {
    console.error("Error fetching question:", error);
    toast.error("Failed to load question");
    return null;
  }
};

export const getNextQuestion = async (currentQuestionId, answer) => {
  try {
    const questionFlow = await getQuestionFlow();
    const currentQuestion = questionFlow[currentQuestionId];
    
    if (!currentQuestion) {
      return null;
    }

    let nextId = currentQuestion.next;
    
    // Handle conditional next questions
    if (typeof nextId === "object") {
      if (currentQuestion.type === "boolean") {
        nextId = nextId[answer] || nextId.yes;
      }
    }
    
    return nextId;
  } catch (error) {
    console.error("Error getting next question:", error);
    toast.error("Failed to get next question");
    return null;
  }
};

export const getTotalSteps = async () => {
  try {
    const questionFlow = await getQuestionFlow();
    return Object.keys(questionFlow).length;
  } catch (error) {
    console.error("Error getting total steps:", error);
    return 10; // Default fallback
  }
};