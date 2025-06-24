import { SingleItemModel } from './SingleItemModel';

// Define the type for the configuration data
interface AppConfigData {
    version: string | null;
}

// Extend SingleItemModel with AppConfigData
export class AppConfigModel extends SingleItemModel {
    constructor() {
        super('appConfigStore', 'appConfig');
    }

    // Method to set fields in the store
    setFields(data: Partial<AppConfigData>): void {
        if (this.store) {
            // Type assertion to avoid TypeScript errors if `fields` is not present on `Store`
            (this.store as any).fields = { ...AppConfigModel.fields, ...data };
        } else {
            console.warn("Store is not initialized.");
        }
    }

    // Static fields for AppConfig
    static fields: AppConfigData = {
        version: null
    };
}
