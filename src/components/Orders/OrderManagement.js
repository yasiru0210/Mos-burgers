import React, { useState, useEffect } from 'react';
import { mockOrders } from '../../data/mockData';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  ShoppingCart,
  FileText,
  Calendar
} from 'lucide-react';
import { OrderModal } from './OrderModal';
import { DeleteOrderModal } from './DeleteOrderModal';

export const OrderManagement = ({ isNew = false }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  useEffect(() => {
    if (isNew) {
      setShowNewOrderModal(true);
    }
  }, [isNew]);

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      // Edit existing order
      setOrders(prev => prev.map(order => 
        order.id === editingOrder.id ? { ...orderData, id: order.id } : order
      ));
      setEditingOrder(null);
    } else {
      // Add new order
      const newOrder = {
        ...orderData,
        id: `ORD${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      };
      setOrders(prev => [newOrder, ...prev]);
    }
    setShowNewOrderModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    setDeletingOrder(null);
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.phone.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const generateReceipt = (order) => {
    // Generate receipt content
    const receiptContent = `
      MOS Burger Receipt
      ------------------
      Order #: ${order.id}
      Date: ${order.date}
      Customer: ${order.customer.name}
      
      Items:
      ${order.items.map(item => 
        `${item.foodItem.name} x${item.quantity} - $${item.subtotal.toFixed(2)}`
      ).join('\n')}
      
      Subtotal: $${order.subtotal.toFixed(2)}
      ${order.discount > 0 ? `Discount (${(order.discount * 100).toFixed(0)}%): -$${(order.subtotal * order.discount).toFixed(2)}\n` : ''}
      Total: $${order.total.toFixed(2)}
    `;

    // Create and download receipt file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600 mt-1">Manage orders, track payments, and generate receipts</p>
        </div>
        <button 
          onClick={() => setShowNewOrderModal(true)}
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by order ID, customer name, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Items</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Total</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{order.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      {order.discount > 0 && (
                        <p className="text-sm text-green-600">
                          {(order.discount * 100).toFixed(0)}% discount
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generateReceipt(order)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Generate Receipt"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingOrder(order)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        title="Edit Order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingOrder(order)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or create a new order</p>
        </div>
      )}

      {/* Modals */}
      <OrderModal
        isOpen={showNewOrderModal || editingOrder !== null}
        onClose={() => {
          setShowNewOrderModal(false);
          setEditingOrder(null);
        }}
        onSave={handleSaveOrder}
        order={editingOrder}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order ID</p>
                  <p className="text-sm text-gray-600">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Date</p>
                  <p className="text-sm text-gray-600">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.foodItem.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.foodItem.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">${item.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount ({(selectedOrder.discount * 100).toFixed(0)}%):</span>
                      <span className="text-green-600">-${(selectedOrder.subtotal * selectedOrder.discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteOrderModal
        isOpen={deletingOrder !== null}
        onClose={() => setDeletingOrder(null)}
        onConfirm={() => handleDeleteOrder(deletingOrder.id)}
        orderId={deletingOrder?.id}
      />
    </div>
  );
};
