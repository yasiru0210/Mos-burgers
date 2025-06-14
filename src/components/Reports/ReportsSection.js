import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  DollarSign,
  Package
} from 'lucide-react';
import { generateReport } from './ReportGenerator';

const reportTypes = [
  { id: 'monthly', label: 'Monthly Sales', icon: Calendar },
  { id: 'annual', label: 'Annual Report', icon: TrendingUp },
  { id: 'customers', label: 'Top Customers', icon: Users },
  { id: 'items', label: 'Item Analysis', icon: Package }
];

export const ReportsSection = () => {
  const [activeReport, setActiveReport] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isGenerating, setIsGenerating] = useState(false);

  const monthlyData = {
    totalSales: 15480.50,
    totalOrders: 324,
    avgOrderValue: 47.78,
    topItems: [
      { name: 'MOS Burger', quantity: 145, revenue: 1232.50 },
      { name: 'Chicken Teriyaki Burger', quantity: 98, revenue: 882.00 },
      { name: 'French Fries', quantity: 187, revenue: 654.50 },
      { name: 'Coca Cola', quantity: 234, revenue: 585.00 },
      { name: 'Fish Burger', quantity: 67, revenue: 502.50 }
    ],
    topCustomers: [
      { name: 'Emily Wilson', orders: 12, spent: 567.80 },
      { name: 'Sarah Johnson', orders: 10, spent: 445.20 },
      { name: 'John Smith', orders: 8, spent: 389.40 },
      { name: 'Mike Davis', orders: 6, spent: 234.60 }
    ]
  };

  const annualData = {
    totalSales: 185766.00,
    totalOrders: 3888,
    avgOrderValue: 47.78,
    monthlyBreakdown: [
      { month: 'Jan', sales: 14567.50, orders: 305 },
      { month: 'Feb', sales: 16234.20, orders: 340 },
      { month: 'Mar', sales: 15876.80, orders: 332 },
      { month: 'Apr', sales: 17445.60, orders: 365 },
      { month: 'May', sales: 16890.40, orders: 354 },
      { month: 'Jun', sales: 18234.70, orders: 382 }
    ]
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      switch (activeReport) {
        case 'monthly':
          generateReport('monthly', monthlyData, selectedMonth);
          break;
        case 'annual':
          generateReport('annual', annualData, selectedYear);
          break;
        case 'customers':
          generateReport('customers', null, selectedMonth);
          break;
        case 'items':
          generateReport('items', null, selectedMonth);
          break;
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Track sales performance and customer insights</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className={`inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg transition-colors duration-200 ${
            isGenerating ? 'opacity-75 cursor-not-allowed' : 'hover:bg-orange-600'
          }`}
        >
          <Download className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-bounce' : ''}`} />
          {isGenerating ? 'Generating...' : 'Export Report'}
        </button>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setActiveReport(report.id)}
                disabled={isGenerating}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  activeReport === report.id
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                } ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{report.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      {activeReport === 'monthly' && (
        <div className="space-y-6">
          {/* Date Selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select Month:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">${monthlyData.totalSales.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{monthlyData.totalOrders}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">${monthlyData.avgOrderValue}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Items and Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h3>
              <div className="space-y-4">
                {monthlyData.topItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h3>
              <div className="space-y-4">
                {monthlyData.topCustomers.map((customer, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${customer.spent.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeReport === 'annual' && (
        <div className="space-y-6">
          {/* Year Selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>

          {/* Annual Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Annual Sales</p>
                  <p className="text-2xl font-bold text-gray-900">${annualData.totalSales.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{annualData.totalOrders}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Average</p>
                  <p className="text-2xl font-bold text-gray-900">${(annualData.totalSales / 12).toFixed(0)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {annualData.monthlyBreakdown.map((month) => (
                <div key={month.month} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">{month.month}</p>
                  <p className="text-lg font-bold text-gray-900">${month.sales.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{month.orders} orders</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeReport === 'customers' || activeReport === 'items') && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeReport === 'customers' ? 'Customer Analytics' : 'Item Analysis'}
          </h3>
          <p className="text-gray-600">
            Detailed {activeReport === 'customers' ? 'customer insights and behavior patterns' : 'item performance and inventory analytics'} coming soon.
          </p>
        </div>
      )}
    </div>
  );
};
