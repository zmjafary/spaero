import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import apiClient from '../api';
import { EventBus } from '@/eventBus';
import { v4 as uuidv4 } from 'uuid';

// Define the type of the data expected in PurchaseRfqModel
interface CartItemsData {
    id: number | null;
}
  

export class CartItemsModel extends BaseModel<CartItemsData> {
    useMocks: boolean = false;

    constructor() {
        super('CartItemsStore', 'cart/items');
        this.fetchAll();
    }

    async removeFromCart(cartItem: any) {
        const requestMethod = apiClient.delete;
        const response = await requestMethod<any>(`/cart/items/${cartItem.id}`);
        this.fetchAll();
        EventBus.emit('purchaseEnquiriesUpdated', {});
    }

    createCardLinks(cartItem: any) {
        const buttonText = ref('Remove');
        const buttonCallback = () => this.removeFromCart(cartItem);

        return [
            { 
                type: 'help', 
                link_text: 'View part details', 
                icon: 'fa-light fa-list',
                random: uuidv4(),
                help: { 
                    readMore: { 
                        title: 'Part Details', 
                        component: PartDetail, 
                        data: cartItem.enquire
                    } 
                }
            },
            { link_text: buttonText.value, callback: buttonCallback }
        ];
    }

    async updateCartItemAogStatus(cartItem: any, status: boolean) {
        let url = '/cart/items/' + cartItem.id + '/aog/toggle';

        await apiClient.put(url, {
           aog: status? 1 : 0
        });

        this.fetchAll();
        EventBus.emit('purchaseEnquiriesUpdated', {});
    }

    convertToCard(item: any) {
        return {
            title: item.enquire.part_number,
            body: [{
                'Part Number': item.enquire.part_number,
                'Condition': item.enquire.condition || '-',
                'Supplier': item.enquire.company?.company_name || '-',
                'Outright Price': (parseFloat(item.enquire.outright) > 0 ? item.enquire.outright : '-' ),
                'AOG': {
                    type: 'toggle',
                    change: async (newVal) => {
                        await this.updateCartItemAogStatus(item, newVal.detail.checked);
                    },
                    default: item.aog == 1 ? true : false
                },
                'links': this.createCardLinks(item),
            }],
        };
    }

    convertToRepairCard(item: any) {
        return {
            title: item.enquire.part_number,
            body: [{
                'Part number': item.enquire.part_number,
                'Test, Teardown & Evaluation': item.bench_check_price || '-',
                'Estimate overhaul Cost': item.average_overhaul_price || '-',
                'Estimated repair cost': item.average_repair_price || '-',
                'Test & recertification cost (est.)': item.test_certify || '-',
                'Repair quantity': item.quantity || '-',
                'links': this.createCardLinks(item),
            }],
        };
    }

    isInCart(purchase_rfq_id, enquiry_id, type = 'purchase'  ) {
        const cartItems = this.store.data[type];

        for (const key in cartItems) {
            if (cartItems.hasOwnProperty(key)) {
                const item = cartItems[key];
                if (parseInt(item.requestID) == parseInt(purchase_rfq_id) && parseInt(item.enquiresID) == parseInt(enquiry_id)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    setFields(data: Partial<CartItemsData>): void {
        this.store.fields = { ...CartItemsModel.fields, ...data };
    }

    static fields: CartItemsData = {
        id: null
    };
}
