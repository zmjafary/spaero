import { BaseModel } from './BaseModel';
import { ref, computed } from 'vue';
import PartDetail from '../components/PartDetail.vue';
import apiClient from '../api';
import { CartItemsModel } from './CartItemsModel';
import { EventBus } from '@/eventBus';
import { v4 as uuidv4 } from 'uuid';

interface RepairEnquiriesData {
    id: any | string | number | null;
}

export class RepairEnquiriesModel extends BaseModel<RepairEnquiriesData> {
    useMocks = false;
    reapir_rfq_id = ref(null);
    cartItemsModel = ref(new CartItemsModel());

    constructor(reapir_rfq_id: any) {
        super('RepairEnquiriesStore', `repair-rfqs/${reapir_rfq_id}/repair-enquiries`);
        this.reapir_rfq_id.value = reapir_rfq_id;
        this.cartItemsModel.value.fetchAll();
    }

    async cartAction(enquiry: any, actionType: 'add' | 'remove') {
        const requestMethod = actionType === 'add' ? apiClient.post : apiClient.delete;
        const response = await requestMethod<any>(`/repair-rfqs/${this.reapir_rfq_id.value}/repair-enquiries/${enquiry.id}/cart`, actionType === 'add' ? { quantity: 1, aog: 0 } : {});
        await this.cartItemsModel.value.fetchAll();
        EventBus.emit('purchaseEnquiriesUpdated', {});
        EventBus.emit('cartUpdated', {});
    }

    createCardLinks(enquiry: any) {
        const isInCart = computed(() => 
            this.cartItemsModel.value.isInCart(this.reapir_rfq_id.value, enquiry.id, 'repair')
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

    convertToCard(part_number: string, enquiries: any) {
        if(!Array.isArray(enquiries)) throw new Error('Invalid enquiries list.');

        return {
            title: part_number,
            body: enquiries.map((enquiry: any) => ({
                'Part Number': part_number,
                'Test, Teardown & Evaluation': `$${enquiry.bench_check_price || '0'}`,
                'Estimated overhaul cost': `$${enquiry.average_overhaul_price || '0'}`,
                'Estimated repair cost': `$${enquiry.average_repair_price || '0'}`,
                'Test & recertification cost (est.)': `$${enquiry.test_certify || '0'}`,
                'links': this.createCardLinks(enquiry),
            })),
            headers: { quoted: enquiries.every((enquiry: any) => enquiry.companyID > 0) }
        };
    }

    setFields(data: Partial<RepairEnquiriesData>) {
        this.store.fields = { ...RepairEnquiriesModel.fields, ...data };
    }

    static fields: RepairEnquiriesData = { id: null };
}