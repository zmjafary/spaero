import apiClient from '@/api';
import secureStorageService from './secureStorageService';

// Define types for the response and credentials
interface LoginResponse {
    access_token: string;
}

interface RegisterResponse extends LoginResponse {}

interface ProfileResponse {
    [key: string]: any; // Adjust according to the actual profile shape
}

interface AuthCredentials {
    email: string;
    password: string;
}

interface User {
    email: string;
    password: string;
    // Add other fields as necessary
}

// Storage keys
const TOKEN_KEY = 'authToken';
const PROFILE_KEY = 'authProfile';
const STATISTICS_KEY = 'authProfileStatistics';

class AuthService {
    async login(credentials: AuthCredentials): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        await this.setToken(response.data.access_token);
        return response.data;
    }

    async register(user: User): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/auth/register', user);
        await this.setToken(response.data.access_token);
        return response.data;
    }

    async setAuthHeader(token?: string | null) {
        token = token || await this.getToken();
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    async setToken(token: string) {
        await secureStorageService.set(TOKEN_KEY, token);
        await this.setAuthHeader(token);
    }

    async getToken(): Promise<string | null> {
        return await secureStorageService.get(TOKEN_KEY);
    }

    async getProfile(flush = false): Promise<ProfileResponse> {
        let profile = null;
        let statistics = null;
        
        try {
            if (!flush) {
                profile = await secureStorageService.getObject(PROFILE_KEY);
                statistics = await secureStorageService.getObject(STATISTICS_KEY);
            }
            
            // Always set auth header before making requests
            await this.setAuthHeader();
            
            if (!profile || flush) {
                const response = await apiClient.get<ProfileResponse>('/user/profile');
                if (response.data && response.data.data) {
                    profile = response.data.data;
                    await secureStorageService.set(PROFILE_KEY, profile);
                }
            }

            if (!statistics || flush) {
                const response = await apiClient.get<ProfileResponse>('/user/statistics');
                if (response.data && response.data.data) {
                    statistics = response.data.data;
                    await secureStorageService.set(STATISTICS_KEY, statistics);
                }
            }

            return {
                profile: profile || {},
                statistics: statistics || {}
            };
        } catch (error) {
            console.error('Error fetching profile:', error);
            
            // If we haven't tried to get cached data yet, try now
            if (flush && (!profile || !statistics)) {
                profile = await secureStorageService.getObject(PROFILE_KEY);
                statistics = await secureStorageService.getObject(STATISTICS_KEY);
            }
            
            // If there's an error but we have cached data, return it
            if (profile || statistics) {
                return {
                    profile: profile || {},
                    statistics: statistics || {}
                };
            }
            
            // Otherwise return empty objects
            return {
                profile: {},
                statistics: {}
            };
        }
    }

    async logout() {
        await secureStorageService.remove(TOKEN_KEY);
        await secureStorageService.remove(PROFILE_KEY);
        await secureStorageService.remove(STATISTICS_KEY);
        delete apiClient.defaults.headers.common['Authorization'];
    }
}

// Export a singleton instance
export default new AuthService();
