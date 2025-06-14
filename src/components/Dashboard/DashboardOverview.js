import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  AlertTriangle,
  DollarSign
} from 'lucide-react';

const stats = [
  {
    title: 'Total Sales Today',
    value: '$1,247.50',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'green'
  },
  {
    title: 'Orders Today',
    value: '47',
    change: '+8.2%',
    changeType: 'positive',
    icon: ShoppingBag,
    color: 'blue'
  },
  {
    title: 'Total Customers',
    value: '1,234',
    change: '+5.1%',
    changeType: 'positive',
    icon: Users,
    color: 'purple'
  },
  {
    title: 'Expired Items',
    value: '1',
    change: 'Requires Attention',
    changeType: 'warning',
    icon: AlertTriangle,
    color: 'red'
  }
];

const recentOrders = [
  { id: 'ORD001', customer: 'John Smith', total: '$19.48', status: 'completed', time: '2 mins ago' },
  { id: 'ORD002', customer: 'Sarah Johnson', total: '$14.00', status: 'completed', time: '15 mins ago' },
  { id: 'ORD003', customer: 'Mike Davis', total: '$32.75', status: 'pending', time: '23 mins ago' },
  { id: 'ORD004', customer: 'Emily Wilson', total: '$8.50', status: 'completed', time: '45 mins ago' },
];

export const DashboardOverview = () => {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate('/orders/new');
  };

  const handleAddCustomer = () => {
    navigate('/customers/new');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'warning' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' : 'bg-red-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.total}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-gray-500">{order.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={handleNewOrder}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
              <ShoppingBag className="w-4 h-4" />
              <span>New Order</span>
            </button>
            <button 
              onClick={handleAddCustomer}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              <Users className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
            <button 
              onClick={handleViewReports}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
              <TrendingUp className="w-4 h-4" />
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
