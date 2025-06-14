export const mockFoodItems = [
  {
    id: '1',
    name: 'MOS Burger',
    code: 'MB001',
    category: 'Burgers',
    price: 8.50,
    quantity: 25,
    description: 'Our signature beef burger with fresh lettuce and special sauce',
    isExpired: false
  },
  {
    id: '2',
    name: 'Chicken Teriyaki Burger',
    code: 'CTB002',
    category: 'Burgers',
    price: 9.00,
    quantity: 18,
    description: 'Grilled chicken with teriyaki sauce and vegetables',
    isExpired: false
  },
  {
    id: '3',
    name: 'Fish Burger',
    code: 'FB003',
    category: 'Burgers',
    price: 7.50,
    quantity: 12,
    description: 'Crispy fish fillet with tartare sauce',
    isExpired: false
  },
  {
    id: '4',
    name: 'French Fries',
    code: 'FF004',
    category: 'Sides',
    price: 3.50,
    quantity: 45,
    description: 'Golden crispy french fries',
    isExpired: false
  },
  {
    id: '5',
    name: 'Onion Rings',
    code: 'OR005',
    category: 'Sides',
    price: 4.00,
    quantity: 30,
    description: 'Crispy battered onion rings',
    isExpired: false
  },
  {
    id: '6',
    name: 'Coca Cola',
    code: 'CC006',
    category: 'Beverages',
    price: 2.50,
    quantity: 60,
    expirationDate: '2024-12-31',
    description: 'Refreshing cola drink',
    isExpired: false
  },
  {
    id: '7',
    name: 'Orange Juice',
    code: 'OJ007',
    category: 'Beverages',
    price: 3.00,
    quantity: 5,
    expirationDate: '2024-01-15',
    description: 'Fresh orange juice',
    isExpired: true
  },
  {
    id: '8',
    name: 'Chocolate Milkshake',
    code: 'CMS008',
    category: 'Beverages',
    price: 4.50,
    quantity: 20,
    description: 'Rich chocolate milkshake',
    isExpired: false
  },
  {
    id: '9',
    name: 'Apple Pie',
    code: 'AP009',
    category: 'Desserts',
    price: 3.50,
    quantity: 15,
    expirationDate: '2024-02-28',
    description: 'Warm apple pie with cinnamon',
    isExpired: false
  },
  {
    id: '10',
    name: 'Ice Cream Sundae',
    code: 'ICS010',
    category: 'Desserts',
    price: 4.00,
    quantity: 22,
    description: 'Vanilla ice cream with chocolate sauce',
    isExpired: false
  }
];

export const mockCustomers = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1234567890',
    email: 'john@email.com',
    address: '123 Main St, City',
    totalOrders: 15,
    totalSpent: 187.50,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1234567891',
    email: 'sarah@email.com',
    address: '456 Oak Ave, City',
    totalOrders: 23,
    totalSpent: 289.75,
    joinDate: '2024-01-08'
  },
  {
    id: '3',
    name: 'Mike Davis',
    phone: '+1234567892',
    email: 'mike@email.com',
    totalOrders: 8,
    totalSpent: 96.25,
    joinDate: '2024-02-01'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    phone: '+1234567893',
    email: 'emily@email.com',
    address: '789 Pine St, City',
    totalOrders: 31,
    totalSpent: 412.80,
    joinDate: '2023-12-20'
  }
];

export const mockOrders = [
  {
    id: 'ORD001',
    customerId: '1',
    customer: mockCustomers[0],
    items: [
      {
        foodItem: mockFoodItems[0],
        quantity: 2,
        subtotal: 17.00
      },
      {
        foodItem: mockFoodItems[3],
        quantity: 1,
        subtotal: 3.50
      }
    ],
    subtotal: 20.50,
    discount: 0.05,
    total: 19.48,
    date: '2024-01-20',
    status: 'completed'
  },
  {
    id: 'ORD002',
    customerId: '2',
    customer: mockCustomers[1],
    items: [
      {
        foodItem: mockFoodItems[1],
        quantity: 1,
        subtotal: 9.00
      },
      {
        foodItem: mockFoodItems[5],
        quantity: 2,
        subtotal: 5.00
      }
    ],
    subtotal: 14.00,
    discount: 0,
    total: 14.00,
    date: '2024-01-21',
    status: 'completed'
  }
];

export const foodCategories = [
  'All',
  'Burgers',
  'Sides',
  'Drinks',
  'Desserts',
  'Set Meals',
  'Specials'
];
