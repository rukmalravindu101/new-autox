// Application constants
export const APP_NAME = 'Auto X Sri Lanka';
export const APP_DESCRIPTION = 'Heavy Vehicle & Material Platform';

// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'autox_auth_token',
  USER_DATA: 'autox_user_data',
  THEME: 'autox_theme'
} as const;

// Application routes
export const ROUTES = {
  HOME: '/',
  VEHICLES: '/vehicles',
  MATERIALS: '/materials',
  ABOUT: '/about',
  CONTACT: '/contact',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
} as const;

// User roles
export const USER_ROLES = {
  CONSUMER: 'consumer',
  VEHICLE_OWNER: 'vehicle_owner',
  MATERIAL_SUPPLIER: 'material_supplier',
  ADMIN: 'admin'
} as const;

// Vehicle categories
export const VEHICLE_CATEGORIES = [
  'JCB',
  'Excavator', 
  'Tipper',
  'Lorry',
  'Water Bowser',
  'Crane',
  'Concrete Mixer',
  'Road Roller'
] as const;

// Material categories
export const MATERIAL_CATEGORIES = [
  'Sand',
  'Soil', 
  'Gravel',
  'Metal',
  'Bricks',
  'Concrete',
  'Timber',
  'Cement'
] as const;

// Sri Lankan districts
export const SRI_LANKAN_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
] as const;