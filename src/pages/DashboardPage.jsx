import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserReports();
  }, []);

const loadUserReports = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "report_details" } },
          { field: { Name: "CreatedOn" } }
        ],
        orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords("report", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      setReports(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseNew = () => {
    navigate('/purchase');
  };

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

const handleStartNewAssessment = () => {
    navigate('/assessment');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Loading type="dashboard" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Error message={error} onRetry={loadUserReports} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">
            Access your nursing licensure reports and purchase additional regional assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Reports</h2>
                <Button
                  onClick={handlePurchaseNew}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Plus" size={16} />
                  <span>Purchase New Report</span>
                </Button>
              </div>
              
              {reports.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="FileText" size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start your nursing licensure journey by taking our assessment
                  </p>
                  <Button onClick={handleStartNewAssessment} className="btn-primary">
                    Start Assessment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.Id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{report.Name}</h3>
                          <p className="text-sm text-gray-600">
                            Created: {new Date(report.CreatedOn).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(report.Id)}
                        >
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handlePurchaseNew}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="ShoppingCart" size={16} />
                  <span>Purchase Regional Report</span>
                </Button>
<Button
                  onClick={handleStartNewAssessment}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="RefreshCw" size={16} />
                  <span>Start Assessment</span>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Regions</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Countries:</p>
                  <p className="text-gray-600">UK, Australia, New Zealand</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Canada Provinces:</p>
                  <p className="text-gray-600">All 9 provinces available</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">US States:</p>
                  <p className="text-gray-600">9 major states available</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="font-medium text-primary">$5 per regional report</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;