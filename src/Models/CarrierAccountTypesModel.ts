import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import ShippingAccount from '@/components/ShippingAccount.vue';

// Define the type of the data expected in PurchaseRfqModel
interface CarrierAccountTypesData {
    id: number | null;
}

export class CarrierAccountTypesModel extends BaseModel<CarrierAccountTypesData> {
    useMocks: boolean = false;

    constructor() {
        super('CarrierAccountTypesStore', 'cart/shipping/carrier-accounts');
    }

    setFields(data: Partial<CarrierAccountTypesData>): void {
        this.store.fields = { ...CarrierAccountTypesModel.fields, ...data };
    }

    static fields: CarrierAccountTypesData = {
        id: null
    };
}
