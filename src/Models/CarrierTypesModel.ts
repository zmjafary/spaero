import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import ShippingAccount from '@/components/ShippingAccount.vue';

// Define the type of the data expected in PurchaseRfqModel
interface CarrierTypesData {
    id: number | null;
}
  
export class CarrierTypesModel extends BaseModel<CarrierTypesData> {
    useMocks: boolean = false;

    constructor() {
        super('CarrierTypesStore', 'cart/shipping/carriers');
    }

    setFields(data: Partial<CarrierTypesData>): void {
        this.store.fields = { ...CarrierTypesModel.fields, ...data };
    }

    static fields: CarrierTypesData = {
        id: null
    };
}
