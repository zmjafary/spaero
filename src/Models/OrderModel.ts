import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import moment from 'moment';

// Define the type of the data expected in OrderModel
interface OrderData {
    id: number | null;
}
  
export class OrderModel extends BaseModel<OrderData> {
    useMocks: boolean = false;

    constructor() {
        super('OrderStore', 'orders');
    }

    setFields(data: Partial<OrderData>): void {
        this.store.fields = { ...OrderModel.fields, ...data };
    }

    convertToCard(AllModelData: any, status_filters = [], order_type = "PO"): any {
        const responseCardData:any = ref([]);
        for(let i = 0; i < AllModelData.length; i++) {
            let part_numbers = [];
            for(let enquiry in AllModelData[i].enquires){
                part_numbers.push(AllModelData[i].enquires[enquiry].part_number)
            }

            if(status_filters.length == 0 || (status_filters.length > 0 && status_filters.includes(AllModelData[i].order_status)) ){
                responseCardData.value.push({
                    title: '#' + order_type + this.padWithZeroes(AllModelData[i].id),
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

                    filterable: {
                        sort: AllModelData[i].id,
                        filters: {
                            status: {
                                name: 'Has Expired',
                                values: {
                                    1: 'Pending Payment',
                                    2: 'Order Confirmed',
                                    3: 'Waiting Carrier Collection',
                                    4: 'Waiting Customer Collection',
                                    5: 'Order Item(s) Cancelled By Supplier'
                                },
                                callback: (selected) => {
                                    return AllModelData[i].status_label == selected;
                                }
                            },
                            style: {
                                name: 'Purchase Style',
                                values: {
                                    1: 'Outright',
                                    2: 'Exchange',
                                },
                                callback: (selected) => {
                                    return AllModelData[i].purchase_style == selected.toLowerCase();
                                }
                            },
                        }
                    },

                    //specific to rfq
                    isExpired: AllModelData[i].isExpired,
                });
            }
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
