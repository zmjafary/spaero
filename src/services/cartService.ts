import apiClient from '@/api';
import { ref } from 'vue';
import { CartModel } from '@/Models/CartModel';
import { CartItemsModel } from '@/Models/CartItemsModel';
import { EventBus } from '@/eventBus';
import pdfDownloadService from '@/services/pdfDownloadService';

interface cart {
    cart_items: Array<cart_item>;
}

interface cart_item {
    rfq_id: number;
}

interface ErrorResponse {
    response: {
        data: {
            errors: any;
            message: any;
        };
    };
}

class CartService {

    cart:any = ref({});
    cartItems:any = ref([]);
    cartModel = (new CartModel);

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    setAuthHeader(token?: any) {
        token = token || this.getToken();
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    addToCart(){

    }

    removeFromCart(){

    }

    async getCart(){
        this.cart.value = await this.cartModel.fetch(true);

        return this.cart.value;
    }

    getCartItems(){
        this.cartItems.value = (new CartItemsModel).fetchAll();
        
        return this.cartItems.value;
    }

    getCartCount(){

    }

    getCartTotal(){

    }

    async placeOrder(cart: any): Promise<any> {
        try {
            this.setAuthHeader();
            const response = await apiClient.post<any>('/cart', cart);
            
            return response.data;
        } catch (error) {
            throw new cartServiceError((error as ErrorResponse).response.data.message, error);
        }

    }

    async downloadOrderInvoice(orderId){
        try {
            // Use the PDF download service to handle the download
            const fileUrl = `/orders/${orderId}/download`;
            await pdfDownloadService.openPdfInAppBrowser(fileUrl);
        } catch (error) {
            console.log(error);
            throw new cartServiceError((error as ErrorResponse).response.data.message, error);
        }
    }

    async updateInternalRef(order, type = 'purchase'){
        this.setAuthHeader();

        let url_prefix = '';
        if(type === 'repair'){
            url_prefix = `/repair`;
        }

        const response = await apiClient.post(`${url_prefix}/orders/${order.id}/reference`, {
            'customer_ref': order.customer_ref
        });

    }

    async updateShipmentDetails(order, shipping_details){
        this.setAuthHeader();
        const response = await apiClient.post(`/repair/orders/${order.id}/shipment`, shipping_details);
    }

    async updateRepairDetails(order, repair_details){
        this.setAuthHeader();
        const response = await apiClient.post(`/repair/orders/${order.id}/repair-details`, repair_details);
    }

    async updateConfirmReceipt(order, repair_details){
        this.setAuthHeader();
        const response = await apiClient.post(`/repair/orders/${order.id}/confirm-receipt`, repair_details);
    }
}

export class cartServiceError extends Error {
    public errors: any;
    public originalError: any;

    constructor(messages: any, originalError: any) {
        const errorMessage = ref('');

        errorMessage.value = messages;

        super(errorMessage.value);
        this.name = "Unable to continue";
        this.errors = messages;
        this.originalError = originalError;
    }
}

// Export a singleton instance
export default new CartService();
