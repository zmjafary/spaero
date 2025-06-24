import { BaseModel } from './BaseModel';
import { ref, computed } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import apiClient from '../api';
import { CartItemsModel } from './CartItemsModel';
import { EventBus } from '@/eventBus';
import { v4 as uuidv4 } from 'uuid';

interface PurchaseEnquiriesData {
    id: any | string | number | null;
}

export class PurchaseEnquiriesModel extends BaseModel<PurchaseEnquiriesData> {
    useMocks = false;
    purchase_rfq_id = ref(null);
    cartItemsModel = ref(new CartItemsModel());

    constructor(purchase_rfq_id: any, best_match = false) {
        super('PurchaseEnquiriesStore', `purchase-rfqs/${purchase_rfq_id}/purchase-enquiries${best_match ? '/best-match' : ''}`);
        this.purchase_rfq_id.value = purchase_rfq_id;
        this.cartItemsModel.value.fetchAll();
    }

    async cartAction(enquiry: any, actionType: 'add' | 'remove') {
        const requestMethod = actionType === 'add' ? apiClient.post : apiClient.delete;
        const response = await requestMethod<any>(`/purchase-rfqs/${this.purchase_rfq_id.value}/purchase-enquiries/${enquiry.id}/cart`, actionType === 'add' ? { quantity: 1, aog: 0 } : {});
        await this.cartItemsModel.value.fetchAll();
        EventBus.emit('purchaseEnquiriesUpdated', {});
        EventBus.emit('cartUpdated', {});
    }

    createCardLinks(enquiry: any) {
        const isInCart = computed(() => 
            this.cartItemsModel.value.isInCart(this.purchase_rfq_id.value, enquiry.id)
        );

        const buttonText = computed(() => 
            isInCart.value ? 'Remove' : 'Add To Basket'
        );

        const buttonCallback = computed(() => 
            isInCart.value 
                ? () => this.cartAction(enquiry, 'remove')
                : () => this.cartAction(enquiry, 'add')
        );
        const cardLinks: any = ref([
            { 
                type: 'help',
                link_text: 'View part details', 
                icon: 'fa-light fa-list',
                random: uuidv4(),
                help: { 
                    readMore: { 
                        title: 'Part Details', 
                        component: PartDetail, 
                        data: enquiry 
                    }
                }
            }
        ]);

        if(enquiry.company){
            cardLinks.value.push({
                link_text: buttonText,
                callback: buttonCallback, 
                icon: 'fa-light fa-basket-shopping'
            });
        }

        return cardLinks;
    }

    convertToCard(part_number: string, enquiries: any, bestMatch = false) {
        const enquiryList = bestMatch ? enquiries?.best : enquiries;
        if(!Array.isArray(enquiryList)) throw new Error('Invalid enquiries list.');
        
        return {
            title: part_number,
            body: enquiryList.map((enquiry: any) => ({
                'Part Number': part_number,
                'Condition': enquiry.condition || '-',
                'Supplier': enquiry.company?.company_name || '-',
                'Outright Price': (parseFloat(enquiry.outright) > 0 ? enquiry.outright : '-' ),
                'internal_links': this.createCardLinks(enquiry),
            })),
            headers: { [bestMatch ? 'best_match' : 'quoted']: bestMatch ? { rating: enquiries.best[0].rating } : enquiryList.every((enquiry: any) => enquiry.companyID > 0) }
        };
    }

    setFields(data: Partial<PurchaseEnquiriesData>) {
        this.store.fields = { ...PurchaseEnquiriesModel.fields, ...data };
    }

    static fields: PurchaseEnquiriesData = { id: null };
}