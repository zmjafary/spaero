import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import moment from 'moment';

// Define the type of the data expected in RepairOrderModel
interface OrderData {
    id: number | null;
}
  
export class RepairOrderModel extends BaseModel<OrderData> {
    useMocks: boolean = false;

    constructor() {
        super('RepairOrderStore', 'repair/orders');
    }

    setFields(data: Partial<OrderData>): void {
        this.store.fields = { ...RepairOrderModel.fields, ...data };
    }

    convertToCard(AllModelData: any): any {
        const responseCardData:any = ref([]);
        for(let i = 0; i < AllModelData.length; i++) {
            let part_numbers = [];
            for(let enquiry in AllModelData[i].enquires){
                part_numbers.push(AllModelData[i].enquires[enquiry].part_number)
            }

            responseCardData.value.push({
                title: '#RO' + this.padWithZeroes(AllModelData[i].id),
                'status': AllModelData[i].status_label,
                body: [{
                    'Created At': AllModelData[i].created_at,
                    'Internal Ref': AllModelData[i].customer_ref ?? '--',
                    'Part Numbers': part_numbers.join(', '),
                    'Order Type': AllModelData[i].purchase_style,

                    'links': [
                        {
                            link: '/order/details/' + AllModelData[i].id + '?order_type=' + (AllModelData[i].purchase_style ?? 'repair'),
                            link_text: 'View order details',
                            icon: 'fa-light fa-list'
                        },
                    ],
                }],

                //specific to rfq
                isExpired: AllModelData[i].isExpired,
            });
        }

        return responseCardData.value;
    }

    __set____purchase_style(value){
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }
    
    static fields: OrderData = {
        id: null
    };
}
