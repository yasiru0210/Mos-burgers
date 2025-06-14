import React, { useState } from 'react';
import { mockFoodItems, foodCategories } from '../../data/mockData';
import { 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Search,
  Filter,
  Package
} from 'lucide-react';
import { FoodItemModal } from './FoodItemModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

export const FoodItemsManagement = () => {
  const [foodItems, setFoodItems] = useState(mockFoodItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const expiredItems = foodItems.filter(item => item.isExpired);

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Edit existing item
      setFoodItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...itemData, id: item.id } : item
      ));
      setEditingItem(null);
    } else {
      // Add new item
      setFoodItems(prev => [...prev, {
        ...itemData,
        id: Math.max(...prev.map(item => item.id)) + 1
      }]);
    }
  };

  const handleDeleteItem = (id) => {
    const itemToDelete = foodItems.find(item => item.id === id);
    setDeleteItem(itemToDelete);
  };

  const confirmDelete = () => {
    setFoodItems(prev => prev.filter(item => item.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const getStatusBadge = (item) => {
    if (item.isExpired) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Expired
        </span>
      );
    }
    if (item.quantity <= 5) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          <Package className="w-3 h-3 mr-1" />
          Low Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        In Stock
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Food Items Management</h2>
          <p className="text-gray-600 mt-1">Manage your menu items, prices, and inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Expired Items Alert */}
      {expiredItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-medium text-red-800">
              {expiredItems.length} item(s) have expired and need attention
            </h3>
          </div>
          <div className="mt-2 text-sm text-red-700">
            {expiredItems.map(item => item.name).join(', ')}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {foodCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Code: {item.code}</p>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                </div>
                {getStatusBadge(item)}
              </div>

              {item.description && (
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className={`text-sm font-medium ${
                    item.quantity <= 5 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {item.quantity}
                  </span>
                </div>
                {item.expirationDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expires:</span>
                    <span className={`text-sm font-medium ${
                      item.isExpired ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {item.expirationDate}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Modals */}
      <FoodItemModal
        isOpen={showAddModal || editingItem !== null}
        onClose={() => {
          setShowAddModal(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        item={editingItem}
      />

      <DeleteConfirmationModal
        isOpen={deleteItem !== null}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        itemName={deleteItem?.name}
      />
    </div>
  );
};
