import { SingleItemModel } from './SingleItemModel';

// Define the type for the configuration data
interface CompanyData {
    version: string | null;
}

// Extend SingleItemModel with CompanyData
export class CompanyModel extends SingleItemModel {
    constructor() {
        super('CompanyStore', 'user/company');
    }

    // Method to set fields in the store
    setFields(data: Partial<CompanyData>): void {
        if (this.store) {
            // Type assertion to avoid TypeScript errors if `fields` is not present on `Store`
            (this.store as any).fields = { ...CompanyModel.fields, ...data };
        } else {
            console.warn("Store is not initialized.");
        }
    }

    // Static fields for Company
    static fields: CompanyData = {
        version: null
    };
}
