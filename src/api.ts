import axios, { AxiosInstance } from 'axios';
import secureStorageService from './services/secureStorageService';

const TOKEN_KEY = 'authToken';
const API_ADDRESS_KEY = 'apiAddress';
const DEFAULT_API_URL = 'https://spaero-cors.containers.defaultsettings.co.uk/api';

// Get the API base URL from localStorage for now (we'll keep this synchronous)
// We can't easily make this async without significant changes to the app architecture
const getBaseURL = (): string => {
  return localStorage.getItem(API_ADDRESS_KEY) || DEFAULT_API_URL;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add an interceptor to update the baseURL before each request
apiClient.interceptors.request.use(async (config) => {
  // Update baseURL (still using localStorage for API address)
  config.baseURL = getBaseURL();
  
  try {
    // Try to get token from secure storage
    const token = await secureStorageService.get(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token for request:', error);
    
    // Fallback to localStorage if secure storage fails
    const fallbackToken = localStorage.getItem(TOKEN_KEY);
    if (fallbackToken) {
      config.headers.Authorization = `Bearer ${fallbackToken}`;
    }
  }
  
  return config;
});

// Function to set the API address
export const setApiAddress = async (address: string): Promise<void> => {
  localStorage.setItem(API_ADDRESS_KEY, address);
  apiClient.defaults.baseURL = address;
};

export default apiClient;
