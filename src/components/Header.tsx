import React, { useState } from 'react';
import { Menu, X, User, LogOut, Home, Truck, Package, Info, Phone, UserPlus } from 'lucide-react';
import { User as UserType } from '../types';

type ViewType = 'home' | 'vehicles' | 'materials' | 'about' | 'contact' | 'signup' | 'dashboard' | 'profile' | 'confirmation' | 'services' | 'vehicle-listing' | 'material-listing' | 'vehicle-details' | 'vehicle-management';

interface HeaderProps {
  user: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
  onMenuClick: () => void;
  isMenuOpen: boolean;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onHomeNavigate: () => void;
  onShowLogin: () => void;
  onShowSignUp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onMenuClick,
  isMenuOpen,
  currentView,
  onNavigate,
  onHomeNavigate,
  onShowLogin,
  onShowSignUp
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: onHomeNavigate },
    { id: 'vehicles', label: 'Vehicles', icon: Truck, onClick: () => onNavigate('vehicles') },
    { id: 'materials', label: 'Materials', icon: Package, onClick: () => onNavigate('materials') },
    { id: 'about', label: 'About', icon: Info, onClick: () => onNavigate('about') },
    { id: 'contact', label: 'Contact', icon: Phone, onClick: () => onNavigate('contact') }
  ];

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'consumer':
        return 'Service Consumer';
      case 'vehicle_owner':
        return 'Vehicle Owner';
      case 'material_supplier':
        return 'Material Supplier';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'consumer':
        return 'bg-blue-100 text-blue-800';
      case 'vehicle_owner':
        return 'bg-yellow-100 text-yellow-800';
      case 'material_supplier':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={onHomeNavigate}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-yellow-500 font-bold text-xl">A</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                Auto X
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Heavy Vehicle & Material Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-yellow-100 text-yellow-700 shadow-md'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User size={16} className="text-yellow-600" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-bold">{user.name.split(' ')[0]}</div>
                    <div className="text-xs opacity-80">{getRoleDisplayName(user.role)}</div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <User size={24} className="text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">{user.name}</h3>
                          <p className="text-gray-700">{user.email}</p>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getRoleColor(user.role)}`}>
                            {getRoleDisplayName(user.role)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            onNavigate('profile');
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 text-left p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="font-medium text-gray-700">View Profile</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            if (user.role === 'consumer') {
                              onNavigate('dashboard');
                            } else {
                              onNavigate('vehicle-management');
                            }
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 text-left p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <Home className="w-5 h-5 text-gray-500" />
                          <span className="font-medium text-gray-700">
                            {user.role === 'consumer' ? 'Dashboard' : 'Management'}
                          </span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 p-4">
                      <button
                        onClick={() => {
                          onLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 text-left p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onShowLogin}
                  className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onShowSignUp}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick();
                    onMenuClick(); // Close menu
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => {
                      onShowLogin();
                      onMenuClick();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                  >
                    <User size={20} />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      onShowSignUp();
                      onMenuClick();
                    }}
                    className="w-full flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold"
                  >
                    <UserPlus size={20} />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};