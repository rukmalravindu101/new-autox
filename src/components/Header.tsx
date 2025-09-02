import React from 'react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Auto X Vehicle Rental
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Vehicles
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Materials
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;