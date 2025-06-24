import { SingleItemModel } from './SingleItemModel';

export interface CartData {
    version: string | null;
    totals: Object | null;
}

export class CartModel extends SingleItemModel {
    constructor() {
        super('CartStore', 'cart');
    }

    setFields(data: Partial<CartData>): void {
        if (this.store) {
            (this.store as any).fields = { ...CartModel.fields, ...data };
        } else {
            console.warn("Store is not initialized.");
        }
    }

    static fields: CartData = {
        version: null,
        totals: null
    }; 
}
