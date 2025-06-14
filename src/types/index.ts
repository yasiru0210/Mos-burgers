export interface FoodItem {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  quantity: number;
  expirationDate?: string;
  description?: string;
  isExpired: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface SalesReport {
  period: string;
  totalSales: number;
  totalOrders: number;
  topItems: Array<{
    item: string;
    quantity: number;
    revenue: number;
  }>;
  topCustomers: Array<{
    customer: Customer;
    orderCount: number;
    totalSpent: number;
  }>;
}

export type ViewType = 'dashboard' | 'food-items' | 'orders' | 'customers' | 'reports';

// Add interface for components that need isNew prop
export interface ComponentWithNewProp {
  isNew?: boolean;
}