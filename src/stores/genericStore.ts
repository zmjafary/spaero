import { defineStore } from 'pinia';

// Define the type for the store's state
interface StoreState<T> {
    data: T[] | null;
    lastUpdated: number | null;
}

// Define a type for items that will be used in the store
interface Item {
    id: number;
    [key: string]: any;
}

// Define the generic store with types
export function useGenericStore<T extends Item>(name: string) {
    return defineStore(name, {
        state: (): StoreState<T> => ({
            data: null,
            lastUpdated: null,
        }),
        actions: {
            getData() {
                return this.data;
            },
            setData(newData: any) {
                this.data = newData;
                this.lastUpdated = Date.now();
            },
            addItem(item: any) {
                if (!this.data) {
                    this.data = [];
                }
                this.data.push(item);
            },
            updateItem(updatedItem: any) {
                if (!this.data) return;
                const index = this.data.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.data[index] = updatedItem;
                }
            },
            removeItem(id: number) {
                if (!this.data) return;
                this.data = this.data.filter(item => item.id !== id);
            },
        },
    })();
}
