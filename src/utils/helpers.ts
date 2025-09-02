// Utility helper functions

/**
 * Format currency in Sri Lankan Rupees
 */
export const formatCurrency = (amount: number): string => {
  return `Rs. ${amount.toLocaleString()}`;
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +94 XX XXX XXXX
  if (cleaned.startsWith('94')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  // Format as +94 XX XXX XXXX (assuming local number)
  if (cleaned.length === 9) {
    return `+94 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
};

/**
 * Format date for display
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculate time ago from timestamp
 */
export const timeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Sri Lankan phone number
 */
export const isValidSriLankanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check for +94 format or local format
  return (
    (cleaned.startsWith('94') && cleaned.length === 11) ||
    (cleaned.length === 9 && cleaned.startsWith('7'))
  );
};

/**
 * Generate WhatsApp URL
 */
export const generateWhatsAppUrl = (phone: string, message: string): string => {
  const cleanedPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanedPhone.startsWith('94') ? cleanedPhone : `94${cleanedPhone}`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Get role display color
 */
export const getRoleColor = (role: string): string => {
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

/**
 * Get status color
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved':
    case 'active':
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'under_review':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
    case 'inactive':
    case 'unavailable':
      return 'bg-red-100 text-red-800';
    case 'suspended':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};