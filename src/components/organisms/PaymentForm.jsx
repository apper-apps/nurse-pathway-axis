import { useState } from "react";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const PaymentForm = ({ onPaymentSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    email: ""
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  const isValid = () => {
    return formData.cardNumber.length >= 16 && 
           formData.expiry.length >= 5 && 
           formData.cvv.length >= 3 && 
           formData.name.length > 0 && 
           formData.email.length > 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CreditCard" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Secure Payment
          </h2>
          <p className="text-gray-600">
            Get your personalized nursing licensure recommendations
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 mb-8">
          <div className="text-white text-center">
            <h3 className="text-lg font-semibold mb-2">NursePathway Report</h3>
            <div className="text-3xl font-bold mb-1">$9.00 USD</div>
            <p className="text-blue-100">One-time payment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormField
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleChange("cardNumber", e.target.value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim())}
                required
              />
            </div>
            <FormField
              label="Expiry Date"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length >= 2) {
                  value = value.substring(0, 2) + "/" + value.substring(2, 4);
                }
                handleChange("expiry", value);
              }}
              required
            />
            <FormField
              label="CVV"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleChange("cvv", e.target.value.replace(/\D/g, "").substring(0, 3))}
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Lock" className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={onBack} disabled={processing}>
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              type="submit" 
              disabled={!isValid() || processing}
              loading={processing}
              className="ml-auto"
            >
              {processing ? "Processing..." : "Complete Payment"}
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default PaymentForm;