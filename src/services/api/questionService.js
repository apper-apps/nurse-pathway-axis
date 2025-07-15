import questionFlow from "@/services/mockData/questionFlow.json";

export const getQuestionFlow = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questionFlow);
    }, 300);
  });
};

export const getQuestion = async (questionId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questionFlow[questionId]);
    }, 200);
  });
};

export const getNextQuestion = async (currentQuestionId, answer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentQuestion = questionFlow[currentQuestionId];
      
      if (!currentQuestion) {
        resolve(null);
        return;
      }

      let nextId = currentQuestion.next;
      
      // Handle conditional next questions
      if (typeof nextId === "object") {
        if (currentQuestion.type === "boolean") {
          nextId = nextId[answer] || nextId.yes;
        }
      }
      
      resolve(nextId);
    }, 200);
  });
};

export const getTotalSteps = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate total possible steps
      const totalSteps = Object.keys(questionFlow).length;
      resolve(totalSteps);
    }, 100);
  });
};