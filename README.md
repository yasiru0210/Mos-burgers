# MOS Burgers Management System

A comprehensive restaurant management system built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard Overview**: Real-time sales metrics and quick actions
- **Food Items Management**: Add, edit, delete menu items with expiration tracking
- **Order Management**: Process orders, track status, and generate receipts
- **Customer Management**: Maintain customer database and order history
- **Reports & Analytics**: Monthly and annual sales reports

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mos-burgers-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions. Simply push to the `main` branch and the site will be deployed automatically.

### Manual Deployment

You can also deploy the built files to any static hosting service:

1. Build the project: `npm run build`
2. Upload the contents of the `dist/` folder to your hosting provider

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard/      # Dashboard related components
│   ├── FoodItems/      # Food items management
│   ├── Orders/         # Order management
│   ├── Customers/      # Customer management
│   ├── Reports/        # Reports and analytics
│   └── Layout/         # Layout components (Header, Sidebar)
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Features Overview

### Food Items Management
- Add new menu items with categories
- Track inventory quantities
- Monitor expiration dates
- Update prices and descriptions
- Categorized display (Burgers, Sides, Beverages, Desserts)

### Order Management
- Create new orders with item selection
- Apply discounts to orders
- Track order status (pending, completed, cancelled)
- Generate receipts
- Search orders by ID or customer

### Customer Management
- Add and manage customer information
- Track customer order history
- View customer statistics (total orders, total spent)
- Search customers by name, phone, or email

### Reports & Analytics
- Monthly sales reports
- Annual performance overview
- Top-selling items analysis
- Customer insights
- Export functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.