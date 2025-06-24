import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import ShippingAccount from '@/components/ShippingAccount.vue';

// Define the type of the data expected in PurchaseRfqModel
interface ShippingMethodsData {
    id: number | null;
}
  

export class ShippingMethodsModel extends BaseModel<ShippingMethodsData> {
    useMocks: boolean = false;

    constructor() {
        super('ShippingMethodsStore', 'cart/shipping/methods');
    }

    __set____insure(value){
        return value? 'Yes' : 'No';
    }

    convertToCard(shippingMethod: any) {
        return {
                    title: shippingMethod.carrier_name + ' / ' + shippingMethod.account_type,
        
                    body: [{
                            'Carrier Name': shippingMethod.carrier_name,
                            'Account Type': shippingMethod.account_type,
                            'Account Number': shippingMethod.account_number,
                            'Zip Code': shippingMethod.zip_code,
                            'Service Level': shippingMethod.service_level,
                            'Contact Email': shippingMethod.contact_email,
                            'Insured': shippingMethod.insure,
            
                            links: [
                                {
                                    type: 'component',
            
                                    component: {
                                        type: ShippingAccount,
                                        data: shippingMethod
                                    }
                                }
                            ]
                        }
                    ],
        
                }
    }

    setFields(data: Partial<ShippingMethodsData>): void {
        this.store.fields = { ...ShippingMethodsModel.fields, ...data };
    }

    static fields: ShippingMethodsData = {
        id: null
    };
}
