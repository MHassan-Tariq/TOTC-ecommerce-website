// API Configuration and Utility Functions
// This file handles all communication between frontend and backend

// API Base URL - Use relative path for Vite proxy in development, or full URL for production
// In development, Vite proxy will forward /api requests to http://localhost:5000
const API_BASE_URL = 'http://localhost:9880/api';

/**
 * Helper function to make API requests
 */
async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Debug logging (remove in production)
  if (import.meta.env.DEV) {
    console.log(`🌐 API Request: ${method} ${url}`, data ? { data } : '');
  }
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add token to headers if provided (for protected routes)
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  // Add body for POST/PUT requests
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    console.log(response);
    
    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    let result;
    console.log(result);
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
      console.log(result);
    } else {
      const text = await response.text();
      throw new Error(text || 'Server returned an invalid response');
    }

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Something went wrong');
    }

    return result;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('❌ Network Error:', error);
      console.error('💡 Make sure:');
      console.error('   1. Backend is running on http://localhost:3000');
      console.error('   2. Vite dev server is running');
      console.error('   3. No firewall blocking the connection');
      throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:3000');
    }
    // Re-throw other errors with their messages
    console.error('❌ API Error:', error);
    throw error;
  }
}

/**
 * Authentication API Functions
 */

// Register a new user
export const registerUser = async (userData) => {
  return apiRequest('/auth/register', 'POST', userData);
};

// Login user
export const loginUser = async (credentials) => {
  return apiRequest('/auth/login', 'POST', credentials);
};

// Example: Get protected user data (if you add this endpoint later)
export const getUserData = async (token) => {
  return apiRequest('/auth/user', 'GET', null, token);
};

/**
 * Forgot Password API Functions
 */

// Step 1: Send OTP to email
export const sendOTP = async (email) => {
  return apiRequest('/auth/forgot-password', 'POST', { email });
};

// Step 2: Verify OTP
export const verifyOTP = async (email, otp) => {
  return apiRequest('/auth/verify-otp', 'POST', { email, otp });
};

// Step 3: Reset Password
export const resetPassword = async (email, resetToken, newPassword) => {
  return apiRequest('/auth/reset-password', 'POST', { email, resetToken, newPassword });
};

// Token storage helpers (using localStorage)
export const tokenStorage = {
  get: () => localStorage.getItem('authToken'),
  set: (token) => localStorage.setItem('authToken', token),
  remove: () => localStorage.removeItem('authToken'),
};

