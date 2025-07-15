import { useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import PaymentForm from "@/components/organisms/PaymentForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { processPayment } from "@/services/api/paymentService";

const PaymentPage = ({ onPaymentSuccess, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await processPayment(paymentData);
      
      if (result.success) {
        toast.success("Payment successful! Generating your report...");
        onPaymentSuccess(result);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
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