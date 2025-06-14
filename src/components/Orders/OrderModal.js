import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { mockFoodItems } from '../../data/mockData';

export const OrderModal = ({ isOpen, onClose, onSave, order }) => {
  const [formData, setFormData] = useState({
    customer: { name: '', phone: '' },
    items: [],
    status: 'pending'
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customer: { ...order.customer },
        items: [...order.items],
        status: order.status
      });
    }
  }, [order]);

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { foodItem: null, quantity: 1, subtotal: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, foodItem, quantity) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          const subtotal = foodItem ? foodItem.price * quantity : 0;
          return { foodItem, quantity, subtotal };
        }
        return item;
      })
    }));
  };

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.subtotal, 0);
    // Apply a 10% discount if order is over $50
    const discount = subtotal > 50 ? 0.1 : 0;
    const total = subtotal * (1 - discount);
    return { subtotal, discount, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subtotal, discount, total } = calculateTotal();
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    onSave({
      ...formData,
      date,
      subtotal,
      discount,
      total
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {order ? 'Edit Order' : 'New Order'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, name: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customer.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, phone: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <select
                        value={item.foodItem?.id || ''}
                        onChange={(e) => {
                          const foodItem = mockFoodItems.find(f => f.id === e.target.value);
                          updateItem(index, foodItem, item.quantity);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select an item</option>
                        {mockFoodItems.map(food => (
                          <option key={food.id} value={food.id}>
                            {food.name} - ${food.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-32">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => updateItem(index, item.foodItem, Math.max(1, item.quantity - 1))}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, item.foodItem, parseInt(e.target.value) || 1)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => updateItem(index, item.foodItem, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      ${item.subtotal.toFixed(2)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            {formData.items.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">${calculateTotal().subtotal.toFixed(2)}</span>
                  </div>
                  {calculateTotal().discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount (10%):</span>
                      <span className="text-green-600">
                        -${(calculateTotal().subtotal * calculateTotal().discount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Status Selection (for editing) */}
            {order && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                {order ? 'Save Changes' : 'Create Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
