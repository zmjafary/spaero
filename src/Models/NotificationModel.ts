import { BaseModel } from './BaseModel';
import { ref } from 'vue';
import moment from 'moment';

// Define the type of the data expected in NotificationModel
interface NotificationData {
    id: number | null;
    created_at: string | null;
}
  
export class NotificationModel extends BaseModel<NotificationData> {
    useMocks: boolean = false;

    constructor() {
        super('NotificationStore', 'notifications');
    }

    setFields(data: Partial<NotificationData>): void {
        this.store.fields = { ...NotificationModel.fields, ...data };
    }

    static fields: NotificationData = {
        id: null,
        created_at: null
    };
}
