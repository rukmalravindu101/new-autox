# Auto X Sri Lanka - Construction Materials & Vehicle Rental Platform

A comprehensive web platform connecting construction professionals with heavy vehicle owners and material suppliers across Sri Lanka.

## 🚀 Features

### For Service Consumers
- Browse and rent construction vehicles (JCBs, excavators, lorries, etc.)
- Source quality construction materials (sand, soil, bricks, gravel, etc.)
- Direct contact with verified suppliers and vehicle owners
- Real-time availability and pricing information
- Customer reviews and ratings system

### For Vehicle Owners
- List vehicles for rent with custom pricing
- Manage availability and bookings
- Connect with verified customers
- Track earnings and performance
- Professional profile management

### For Material Suppliers
- List construction materials with competitive pricing
- Expand customer base across all 25 districts
- Quality certification support
- Delivery coordination tools
- Business growth analytics

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MySQL** with Sequelize ORM
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email services

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create database
npm run migrate

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=autox_db
DB_USER=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
├── data/               # Static data and mock data
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── main.tsx           # Application entry point

server/
├── config/            # Database configuration
├── middleware/        # Express middleware
├── models/           # Sequelize models
├── routes/           # API routes
├── scripts/          # Database scripts
├── utils/            # Server utilities
└── server.js         # Server entry point
```

## 🌟 Key Features

### User Management
- Multi-role authentication (Consumer, Vehicle Owner, Material Supplier, Admin)
- Profile management with image upload
- Email verification and password reset

### Vehicle Management
- Comprehensive vehicle listings with specifications
- Pricing management (hourly/daily rates)
- Availability scheduling
- Insurance and maintenance tracking

### Material Management
- Material catalog with categories
- Quality certifications
- Delivery area management
- Inventory tracking

### Service Requests
- Request creation and tracking
- Status updates and notifications
- Feedback and rating system
- Payment integration ready

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- XSS and injection prevention

## 📱 Responsive Design

- Mobile-first approach
- Responsive layouts for all screen sizes
- Touch-friendly interface
- Progressive Web App ready

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Deployment
```bash
# Production start
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Dilmi Tharushika** - Project Lead
- **Rukmal Ravindu** - Frontend Developer  
- **Nisala Rukashan** - Backend Developer

## 📞 Support

For support and inquiries:
- Email: support@autox.lk
- Phone: +94 76 1098385
- Website: https://autox.lk

## 🙏 Acknowledgments

- Thanks to all the construction professionals who provided feedback
- Special thanks to the Sri Lankan construction industry for inspiration
- Built with ❤️ for the Sri Lankan construction community