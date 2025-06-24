import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import { EventBus } from '@/eventBus';
import ShippingInformation from '@/components/ShippingInformation.vue';

// Define the type of the data expected in PurchaseRfqModel
interface ShippingAddressesData {
    id: number | null;
}
  

export class ShippingAddressesModel extends BaseModel<ShippingAddressesData> {
    useMocks: boolean = false;

    constructor() {
        super('ShippingAddressesStore', 'cart/shipping/addresses');
    }

    setFields(data: Partial<ShippingAddressesData>): void {
        this.store.fields = { ...ShippingAddressesModel.fields, ...data };
    }

    convertToCard(shippingAddress: any) {
        return {
            title: shippingAddress.short_name,

            body: [{
                'Company Name': shippingAddress.company_name,
                'Contact Name': shippingAddress.contact_name,
                'Contact Telephone': shippingAddress.contact_telephone,
                'Contact Email': shippingAddress.contact_email,
                'Address Line 1': shippingAddress.address_line1,
                'Address Line 2 (Road)': shippingAddress.address_road,
                'Address Line 3 (City)': shippingAddress.address_city,
                'State': shippingAddress.state,
                'Post/Zip Code': shippingAddress.zip_code,
                'Country': shippingAddress.country,
                'VAT/Tax ID': shippingAddress.vat_tax_id,

                links: [
                    {
                        type: 'component',

                        component: {
                            type: ShippingInformation,
                            data: shippingAddress
                        }
                    },
                    {
                        'link_text': 'Remove',
                        callback: async () => {
                            await this.delete(shippingAddress.id);
                            EventBus.emit('aircraftRemoved', shippingAddress.id);
                        }
                    }
                ]
            }],

        }
    }

    static fields: ShippingAddressesData = {
        id: null
    };
}
