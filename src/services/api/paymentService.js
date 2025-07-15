export const processPayment = async (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment processing
      if (paymentData.cardNumber && paymentData.expiry && paymentData.cvv) {
        resolve({
          success: true,
          transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount: 9.00,
          currency: "USD",
          timestamp: new Date().toISOString()
        });
      } else {
        reject(new Error("Invalid payment information"));
      }
    }, 2000);
  });
};

export const validatePayment = async (transactionId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        valid: true,
        transactionId,
        status: "completed"
      });
    }, 500);
  });
};