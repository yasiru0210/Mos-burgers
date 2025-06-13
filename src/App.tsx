import React, { useState } from 'react';
import { ViewType } from './types';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { FoodItemsManagement } from './components/FoodItems/FoodItemsManagement';
import { OrderManagement } from './components/Orders/OrderManagement';
import { CustomerManagement } from './components/Customers/CustomerManagement';
import { ReportsSection } from './components/Reports/ReportsSection';

const viewTitles: Record<ViewType, string> = {
  dashboard: 'Dashboard',
  'food-items': 'Food Items',
  orders: 'Orders',
  customers: 'Customers',
  reports: 'Reports'
};

function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'food-items':
        return <FoodItemsManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header title={viewTitles[activeView]} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;