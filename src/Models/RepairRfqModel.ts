import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import moment from 'moment';

// Define the type of the data expected in RepairRfqModel
interface RepairRfqData {
    id: number | null;
    part_number: string | null;
    region: string | null;
    condition?: string | null;
    certificate?: string | null;
    traceability?: string | null;
    priority?: string | null;
    fleetID?: number | null;
    date_time?: string | null;
    c_id?: number | null;
    view_style?: number | null;
    rating_status?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  

export class RepairRfqModel extends BaseModel<RepairRfqData> {
    useMocks: boolean = false;

    constructor() {
        super('RepairRfqStore', 'repair-rfqs');
    }

    setFields(data: Partial<RepairRfqData>): void {
        this.store.fields = { ...RepairRfqModel.fields, ...data };
    }

    convertToCard(AllModelData: any): any {

        const responseCardData:any = ref([]);
        for(let i = 0; i < AllModelData.length; i++) {
            const partNumbers = AllModelData[i].part_number.split(',').join(', ');
            responseCardData.value.push({

                title: '#SRFQ' + this.padWithZeroes(AllModelData[i].id),
                body: [{
                    'Part Numbers': partNumbers,
                    'Quotes': AllModelData[i].enquires_count + ' / ' + AllModelData[i].quoted_enquires_count,
                    'Date Time': AllModelData[i].date_time,
                    'Aircraft Ref': AllModelData[i].aircraft_fleet && AllModelData[i].aircraft_fleet.registration ? AllModelData[i].aircraft_fleet.registration : '-',

                    'links': [
                        {
                            link: '/repair/rfqs/' + AllModelData[i].id,
                            link_text: 'View quotes',
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

    __set____date_time(value) {
        return moment(value).format('MMM DD YYYY \\a\\t k:mm');
    }

    static fields: RepairRfqData = {
        id: null,
        part_number: null,
        region: null,
        condition: null,
        certificate: null,
        traceability: null,
        priority: null,
        fleetID: null,
        date_time: null,
        c_id: null,
        view_style: null,
        rating_status: null,
        created_at: null,
        updated_at: null,
    };
}
