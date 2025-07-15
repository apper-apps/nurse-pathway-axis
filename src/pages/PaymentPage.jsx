import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import PaymentForm from "@/components/organisms/PaymentForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { processPayment } from "@/services/api/paymentService";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const PaymentPage = ({ onPaymentSuccess, onBack, paymentAmount = 9.00 }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.user);

const handlePayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await processPayment({ ...paymentData, amount: paymentAmount });
      
      if (result.success) {
        // Update user profile payment status
        await updateUserPaymentStatus(true);
        
        toast.success("Payment successful! Generating your report...");
        if (onPaymentSuccess) {
          onPaymentSuccess(result);
        }
      }
    } catch (err) {
      setError(err.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserPaymentStatus = async (paymentStatus) => {
    try {
      if (!user?.userId) {
        console.error("User ID not available");
        return;
      }

      const apperClient = getApperClient();
      const params = {
        records: [{
          Id: user.userId,
          payment_status: paymentStatus
        }]
      };

      const response = await apperClient.updateRecord("user_profile", params);
      
      if (!response.success) {
        console.error("Failed to update payment status:", response.message);
        toast.error("Payment processed but status update failed");
        return;
      }

      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update payment status:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Payment processed but status update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Error message={error} onRetry={() => setError(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <PaymentForm
          onPaymentSuccess={handlePayment}
          onBack={onBack}
        />
      </div>
    </div>
  );
};

export default PaymentPage;