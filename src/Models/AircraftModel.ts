import AddAircraft from '@/components/AddAircraft.vue';
import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import { EventBus } from '@/eventBus';

// Define the type of the data expected in AircraftModel
interface AircraftData {
    id: number | null;
    aircraft_type_id: number | null;
    registration: string | null;
    aircraft_type?: object | null;
} 

export class AircraftModel extends BaseModel<AircraftData> {
    useMocks: boolean = false;

    constructor() {
        super('AircraftStore', 'aircrafts');
    }

    setFields(data: Partial<AircraftData>): void {
        this.store.fields = { ...AircraftModel.fields, ...data };
    }

    convertToCard = (aircraft: any)=> {
        return {
            body: [
                {
                    'Manufacturer': aircraft.aircraft_type.aircraft_manufacture.manufacturer,
                    'Type/Series': aircraft.aircraft_type.type_series,
                    'Registration/MSN': aircraft.registration,

                    links: [
                        {
                            type: 'component',

                            component: {
                                type: AddAircraft,
                                data: aircraft
                            }
                        }, 
                        {
                            'link_text': 'Delete',

                            callback: async () => {
                                await this.delete(aircraft.id);
                                EventBus.emit('aircraftRemoved', aircraft.id);
                            }
                        }
                    ]
                }
            ],
        };
    };

    static fields: AircraftData = {
        id: null,
        aircraft_type_id: null,
        registration: null,
        aircraft_type: null
    };
}
