import { useGenericStore } from '@/stores/genericStore';
import apiClient from "@/api";
import authService from "@/services/authService";
import { ref } from "vue";
import moment from 'moment';

// Define the updated Item interface with id as number | null
interface Item {
    id: number | null;
    [key: string]: any;
}

interface ApiResponse<T> {
    data: T;
}

interface ErrorResponse {
    response: {
        data: {
            errors: any;
            message: any;
        };
    };
}

export class BaseModel<T extends Item> {
    store: any;
    apiUrl: string;
    useMocks?: boolean;

    constructor(entityName: string, apiUrl: string) {
        this.store = useGenericStore(entityName);
        this.apiUrl = apiUrl;

        authService.setAuthHeader();
    }

    async loadJsonFile(fileName: string): Promise<T[]> {
        const response = await fetch(`/src/mocks/${fileName}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
        }
        return response.json();
    }

    padWithZeroes(number, targetLength = 6) {
        let str = String(number);
        while (str.length < targetLength) {
            str = '0' + str;
        }
        return str;
    }

    __set_field(fieldName: keyof T, value: any): any {
        
        const setterMethod = `__set_${String(fieldName)}`;
        if (typeof (this as any)[setterMethod] === 'function') {
            return (this as any)[setterMethod](value);
        }
        
        //Uncomment the below line to see the setter function name
        // return setterMethod;
        return value;
    }

    __set____created_at(value) {
        return moment(value).format('MMM DD YYYY \\a\\t k:mm');
    }

    __set_purchase_____created_at(value) {
        return this.__set____created_at(value);
    }

    __set_repair_____created_at(value) {
        return this.__set____created_at(value);
    }

    __set____updated_at(value) {
        return moment(value).format('MMM DD YYYY \\a\\t k:mm');
    }

    updateFields(data: any, prefix = ""): any {
        if (Array.isArray(data)) {
            data = data.map(item => this.updateFields(item, prefix + "___"));
        } else if (typeof data === 'object' && data !== null) {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    data[key] = this.updateFields(data[key], prefix + key + "__");
                }
            }
        } else {
            data = this.__set_field(prefix.slice(0, -2), data);
        }
        return data;
    }

    async fetchAll(force = false): Promise<T[]> {
        if (this.useMocks) {
            const mockData = await this.loadJsonFile(this.apiUrl);
            this.store.setData(mockData);
            return this.store.data;
        }

        try {
            if (!this.store.data || this.isStale(this.store.lastUpdated) || force) {
                const response = await apiClient.get<ApiResponse<T[]>>(`/${this.apiUrl}`);
                const data: any = response.data.data;

                const localData = this.updateFields(data);
                this.store.setData(localData);
            }

            // console.log(this.store.data);
            return this.store.data;
        } catch (error) {
            this.handleError(error as ErrorResponse);
            throw new ModelApiError((error as ErrorResponse).response.data.message, error);
        }
    }

    async findById(id: number, sub_type = null): Promise<any | undefined> {
        if (this.useMocks) {
            const mockData = await this.loadJsonFile(this.apiUrl);
            this.store.setData(mockData);
        }

        let item;

        if (sub_type === null) {
            item = this.store.data?.find((item: T) => item.id === id);
        } else if (this.store.data && typeof this.store.data === 'object') {
            item = this.store.data[sub_type]?.find((item: T) => item.id === id);
        }

        if (!item) {
            try {
                let response;
                let data: T;

                response = await apiClient.get<ApiResponse<T>>(`/${this.apiUrl}/${id}`);
                if (sub_type === null) {
                    data = response.data.data;
                } else {
                    data = response.data.data[sub_type] || response.data.data;
                }

                const localData = this.updateFields(data);
                return localData;
            } catch (error) {
                this.handleError(error as ErrorResponse);
                throw new ModelApiError((error as ErrorResponse).response.data.message, error);
            }
        }

        return item;
    }

    async create(data: T): Promise<T> {
        if (this.useMocks) {
            return this.store.data;
        }

        try {
            const response = await apiClient.post<ApiResponse<T>>(`/${this.apiUrl}`, data);
            const createdItem = response.data.data;
            createdItem.id = parseInt(createdItem.id?.toString() ?? '0', 10); // Ensure id is a number
            this.fetchAll(true);
            return createdItem;
        } catch (error) {
            this.handleError(error as ErrorResponse);
            throw new ModelApiError((error as ErrorResponse).response.data.message, error);
        }
    }

    async update(data: T, id: number | null = null): Promise<T> {
        if (this.useMocks) {
            return this.store.data;
        }

        try {
            if (id === null) {
                id = parseInt(data.id?.toString() ?? '0', 10); // Ensure id is a number
            }

            const response = await apiClient.put<ApiResponse<T>>(`/${this.apiUrl}/${id}`, data);
            const updatedItem = response.data.data;
            updatedItem.id = parseInt(updatedItem.id?.toString() ?? '0', 10); // Ensure id is a number
            const index = this.store.data.findIndex((item: T) => item.id === id);

            this.fetchAll(true);

            return updatedItem;
        } catch (error) {
            this.handleError(error as ErrorResponse);
            throw new ModelApiError((error as ErrorResponse).response.data.message, error);
        }
    }

    async delete(id: number): Promise<void> {
        if (this.useMocks) {
            return;
        }

        try {
            await apiClient.delete(`/${this.apiUrl}/${id}`);
            this.fetchAll(true);
        } catch (error) {
            this.handleError(error as ErrorResponse);
            throw new ModelApiError((error as ErrorResponse).response.data.message, error);
        }
    }

    isStale(lastUpdated?: number): boolean {
        return true;
        const staleTime = 5 * 60 * 1000; // 5 minutes
        return !lastUpdated || (Date.now() - lastUpdated) > staleTime;
    }

    handleError(error: ErrorResponse): void {
        // Log the error or perform any other error handling
        console.error("API call failed:", error.response.data.message);
        // You can add additional error handling logic here if needed
    }
}

export class ModelApiError extends Error {
    public errors: any;
    public originalError: any;

    constructor(messages: any, originalError: any) {
        const errorMessage = ref('');
        // for (let errorField in messages) {
        //     if (messages.hasOwnProperty(errorField)) {
        //         errorMessage.value += messages[errorField] + "<br />";
        //     }
        // }

        // console.log(messages);

        errorMessage.value = messages;

        super(errorMessage.value);
        this.name = "Unable to continue";
        this.errors = messages;
        this.originalError = originalError;
    }
}
