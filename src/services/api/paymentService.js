import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const processPayment = async (paymentData) => {
  try {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validate payment data
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      throw new Error("Invalid payment information");
    }
    
    // Create payment record in database
    const apperClient = getApperClient();
    const transactionId = "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const paymentRecord = {
      Name: `Payment_${transactionId}`,
      transaction_id: transactionId,
      amount: 9.00,
      currency1: "USD",
      timestamp: new Date().toISOString()
    };
    
    const params = {
      records: [paymentRecord]
    };
    
    const response = await apperClient.createRecord("payment", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      throw new Error("Payment processing failed");
    }
    
    if (response.results && response.results.length > 0) {
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to process payment:${JSON.stringify(failedRecords)}`);
        failedRecords.forEach(record => {
          if (record.message) toast.error(record.message);
        });
        throw new Error("Payment processing failed");
      }
      
      const successfulRecord = response.results.find(result => result.success);
      if (successfulRecord) {
        return {
          success: true,
          transactionId: transactionId,
          amount: 9.00,
          currency: "USD",
          timestamp: new Date().toISOString()
        };
      }
    }
    
    throw new Error("Payment processing failed");
    
  } catch (error) {
    console.error("Error processing payment:", error);
    toast.error(error.message || "Payment processing failed");
    throw error;
  }
};

export const validatePayment = async (transactionId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "transaction_id" } },
        { field: { Name: "amount" } },
        { field: { Name: "timestamp" } }
      ],
      where: [
        {
          FieldName: "transaction_id",
          Operator: "EqualTo",
          Values: [transactionId]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords("payment", params);
    
    if (!response.success) {
      console.error(response.message);
      return {
        valid: false,
        transactionId,
        status: "failed"
      };
    }
    
    if (response.data && response.data.length > 0) {
      return {
        valid: true,
        transactionId,
        status: "completed"
      };
    }
    
    return {
      valid: false,
      transactionId,
      status: "not_found"
    };
    
  } catch (error) {
    console.error("Error validating payment:", error);
    return {
      valid: false,
      transactionId,
      status: "error"
    };
  }
};