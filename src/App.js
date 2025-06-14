import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { FoodItemsManagement } from './components/FoodItems/FoodItemsManagement';
import { OrderManagement } from './components/Orders/OrderManagement';
import { CustomerManagement } from './components/Customers/CustomerManagement';
import { ReportsSection } from './components/Reports/ReportsSection';



const AppContent = () => {
  const navigate = useNavigate();

  const handleViewChange = (view) => {
    const paths = {
      dashboard: '/',
      'food-items': '/food-items',
      orders: '/orders',
      customers: '/customers',
      reports: '/reports'
    };
    navigate(paths[view]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar onViewChange={handleViewChange} />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/food-items" element={<FoodItemsManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/orders/new" element={<OrderManagement isNew={true} />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/customers/new" element={<CustomerManagement isNew={true} />} />
            <Route path="/reports" element={<ReportsSection />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
