import { BaseModel } from './BaseModel';
import { ref } from 'vue';

// Define the type of the data expected in AircraftTypes
interface AircraftTypeData {
    id: number | null;
    registration: string | null;
} 

export class AircraftTypesModel extends BaseModel<AircraftTypeData> {
    useMocks: boolean = false;

    constructor() {
        super('AircraftTypesStore', 'aircrafts/types');
    }

    setFields(data: Partial<AircraftTypeData>): void {
        this.store.fields = { ...AircraftTypesModel.fields, ...data };
    }

    static fields: AircraftTypeData = {
        id: null,
        registration: null,
    };
}
