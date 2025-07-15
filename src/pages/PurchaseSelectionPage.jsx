import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { processPayment } from '@/services/api/paymentService';

const PurchaseSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  const countries = [
    { id: 'uk', name: 'United Kingdom', price: 5 },
    { id: 'australia', name: 'Australia', price: 5 },
    { id: 'newzealand', name: 'New Zealand', price: 5 }
  ];

  const canadianProvinces = [
    { id: 'alberta', name: 'Alberta (CARNA)', price: 5 },
    { id: 'bc', name: 'British Columbia (BCCNM)', price: 5 },
    { id: 'manitoba', name: 'Manitoba (CRNM)', price: 5 },
    { id: 'newbrunswick', name: 'New Brunswick (NANB)', price: 5 },
    { id: 'newfoundland', name: 'Newfoundland and Labrador (CRNNL)', price: 5 },
    { id: 'novascotia', name: 'Nova Scotia (CRNNS)', price: 5 },
    { id: 'ontario', name: 'Ontario (CNO)', price: 5 },
    { id: 'pei', name: 'Prince Edward Island (CRNPEI)', price: 5 },
    { id: 'saskatchewan', name: 'Saskatchewan (CRNS)', price: 5 }
  ];

  const usStates = [
    { id: 'california', name: 'California', price: 5 },
    { id: 'texas', name: 'Texas', price: 5 },
    { id: 'newyork', name: 'New York', price: 5 },
    { id: 'florida', name: 'Florida', price: 5 },
    { id: 'illinois', name: 'Illinois', price: 5 },
    { id: 'georgia', name: 'Georgia', price: 5 },
    { id: 'arizona', name: 'Arizona', price: 5 },
    { id: 'michigan', name: 'Michigan', price: 5 },
    { id: 'nevada', name: 'Nevada', price: 5 }
  ];

  const handleRegionToggle = (regionId) => {
    setSelectedRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  const handlePurchase = async () => {
    if (selectedRegions.length === 0) {
      toast.error('Please select at least one region');
      return;
    }

    try {
      setLoading(true);
      
      const totalAmount = selectedRegions.length * 5;
      const paymentData = {
        cardNumber: '4111111111111111', // Mock data for demo
        expiry: '12/25',
        cvv: '123',
        amount: totalAmount,
        regions: selectedRegions
      };

      const result = await processPayment(paymentData);
      
      if (result.success) {
        toast.success(`Payment successful! ${selectedRegions.length} regional reports purchased.`);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = selectedRegions.length * 5;

  const RegionCard = ({ region, isSelected, onToggle }) => (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-primary/50'
      }`}
      onClick={() => onToggle(region.id)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{region.name}</h3>
          <p className="text-sm text-gray-600">${region.price}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'border-primary bg-primary' : 'border-gray-300'
        }`}>
          {isSelected && <ApperIcon name="Check" size={12} className="text-white" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Purchase Regional Reports
          </h1>
          <p className="text-gray-600">
            Select specific countries and regions for detailed nursing licensure requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selection Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Countries */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Countries</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countries.map((country) => (
                  <RegionCard
                    key={country.id}
                    region={country}
                    isSelected={selectedRegions.includes(country.id)}
                    onToggle={handleRegionToggle}
                  />
                ))}
              </div>
            </Card>

            {/* Canadian Provinces */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Canadian Provinces</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {canadianProvinces.map((province) => (
                  <RegionCard
                    key={province.id}
                    region={province}
                    isSelected={selectedRegions.includes(province.id)}
                    onToggle={handleRegionToggle}
                  />
                ))}
              </div>
            </Card>

            {/* US States */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">US States</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usStates.map((state) => (
                  <RegionCard
                    key={state.id}
                    region={state}
                    isSelected={selectedRegions.includes(state.id)}
                    onToggle={handleRegionToggle}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Summary and Purchase */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Selected regions:</span>
                  <span>{selectedRegions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price per region:</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${totalAmount}.00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePurchase}
                  disabled={selectedRegions.length === 0 || loading}
                  className="w-full btn-primary"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>Purchase Reports</>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Back to Dashboard
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <ApperIcon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Detailed requirements breakdown</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ApperIcon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Timeline and cost estimates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ApperIcon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Implementation steps</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ApperIcon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Job market insights</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSelectionPage;