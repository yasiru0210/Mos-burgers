import { saveAs } from 'file-saver';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const generateMonthlyReport = (data, month) => {
  const content = `
Monthly Sales Report - ${month}
=============================

Summary
-------
Total Sales: ${formatCurrency(data.totalSales)}
Total Orders: ${data.totalOrders}
Average Order Value: ${formatCurrency(data.avgOrderValue)}

Top Selling Items
----------------
${data.topItems.map((item, index) => 
  `${index + 1}. ${item.name}
     Quantity: ${item.quantity}
     Revenue: ${formatCurrency(item.revenue)}`
).join('\n\n')}

Top Customers
------------
${data.topCustomers.map((customer, index) =>
  `${index + 1}. ${customer.name}
     Orders: ${customer.orders}
     Total Spent: ${formatCurrency(customer.spent)}`
).join('\n\n')}
`;
  
  return content;
};

const generateAnnualReport = (data, year) => {
  const content = `
Annual Sales Report - ${year}
============================

Summary
-------
Annual Sales: ${formatCurrency(data.totalSales)}
Total Orders: ${data.totalOrders}
Monthly Average: ${formatCurrency(data.totalSales / 12)}

Monthly Breakdown
---------------
${data.monthlyBreakdown.map(month =>
  `${month.month}
  Sales: ${formatCurrency(month.sales)}
  Orders: ${month.orders}`
).join('\n\n')}
`;
  
  return content;
};

export const generateReport = (type, data, period) => {
  let content;
  let filename;

  switch (type) {
    case 'monthly':
      content = generateMonthlyReport(data, period);
      filename = `monthly-report-${period}.txt`;
      break;
    case 'annual':
      content = generateAnnualReport(data, period);
      filename = `annual-report-${period}.txt`;
      break;
    case 'customers':
      content = 'Customer Analytics Report\n=======================\n\nDetailed customer insights and behavior patterns will be available in future updates.';
      filename = `customer-report-${period}.txt`;
      break;
    case 'items':
      content = 'Item Analysis Report\n===================\n\nDetailed item performance and inventory analytics will be available in future updates.';
      filename = `item-analysis-${period}.txt`;
      break;
    default:
      throw new Error('Invalid report type');
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
};
