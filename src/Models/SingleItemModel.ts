import { useGenericStore } from '@/stores/genericStore'; // Assume this has TypeScript definitions
import apiClient from "@/api"; // Ensure apiClient is properly typed
import authService from "@/services/authService";
import { ModelApiError } from './BaseModel';

// Define the structure of the store's data and methods
// Define the structure of your store
interface Store<T> {
    data: T | null;
    lastUpdated?: number;
    setData(newData: T): void;
    addItem(item: T): void;
    updateItem(updatedItem: T): void;
    removeItem(id: number): void;
}

// Define the type of the data used by SingleItemModel
interface SingleItemData {
    // Define the properties of the data based on your needs
    id: number;
    [key: string]: any;
}

// Define the shape of the response from the API
interface ApiResponse<T> {
    data: T;
}

// Define a more specific error type for API errors
interface ApiError {
    response: {
        data: {
            errors: any;
        };
    };
}

export class SingleItemModel {
    public store: any;
    public apiUrl: string;

    constructor(entityName: string, apiUrl: string) {
        this.store = useGenericStore(entityName);
        this.apiUrl = apiUrl;

        authService.setAuthHeader();
    }

    async fetch(force = false): Promise<SingleItemData | null> {
        try {
            if (force || !this.store?.data || this.isStale(this.store.lastUpdated)) {
                const response = await apiClient.get<ApiResponse<SingleItemData>>(`/${this.apiUrl}`);
                this.store?.setData(response.data.data);
            }
            return this.store?.data ?? null;
        } catch (error) {
            this.handleError(error as ApiError);
            throw new ModelApiError((error as ApiError).response.data.errors, error);
        }
    }

    async update(data: SingleItemData): Promise<SingleItemData> {
        try {
            const response = await apiClient.put<ApiResponse<SingleItemData>>(`/${this.apiUrl}`, data);
            this.fetch(true);
            return response.data.data;
        } catch (error) {
            this.handleError(error as ApiError);
            throw new ModelApiError((error as ApiError).response.data.errors, error);
        }
    }

    isStale(lastUpdated?: number): boolean {
        const staleTime = 5 * 60 * 1000; // 5 minutes
        return !lastUpdated || (Date.now() - lastUpdated) > staleTime;
    }

    handleError(error: ApiError): void {
        // Log the error or perform any other error handling
        console.error("API call failed:", error.response.data.errors);
        // You can add additional error handling logic here if needed
    }
}