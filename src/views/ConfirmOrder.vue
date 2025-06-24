<template>
  <ion-page id="main-content">
    <ion-toolbar class="spaero-toolbar safe-space">
     <div class="container">
       <ion-header>
         <ion-buttons slot="start">
           <ion-back-button defaultHref="/basket" text="">
             <i class="fa-solid fa-chevron-left"></i>
           </ion-back-button>
         </ion-buttons>
         <ion-title>Confirm Order</ion-title>
       </ion-header>
     </div>
   </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="container container--narrow">
        <h1>Confirm order</h1>
        <p>Select your payment and shipping information below before placing your order.</p>
      </div>
      <div class="main-content">
        <div class="container container--narrow" v-if="errorMessage">
          <Message v-if="errorMessage" title="Unable to complete order" :text="errorMessage" type="error" />
        </div>
        <div class="container container--narrow" v-if="isCreditExceeded">
          <Message title="Credit Limit Exceeded" text="The account is currently over its credit limit. Please contact our the Spaero team for support." type="error" />
        </div>
        <div class="container container--narrow" v-else>
          <template v-if="isCreditAvailable">
            <p>Select your shipping address</p>
            <div class="confirm__toggle">
              <ion-toggle v-model="confirmOrderForm.proformaInvoice">Proforma invoice</ion-toggle>
            </div>
            <div class="confirm__toggle">
              <ion-toggle v-model="confirmOrderForm.creditAccount">Credit account</ion-toggle>
              <div class="confirm__method-details">
                <ion-row>
                  <ion-col>Credit Limit:</ion-col>
                  <ion-col>${{ company.credit_limit.limit }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>Available Credit:</ion-col>
                  <ion-col>${{ company.credit_limit.availableAmount }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>Payment Terms:</ion-col>
                  <ion-col>NET30</ion-col>
                </ion-row>
              </div>
            </div>
          </template>
          <template v-else="isCreditAvailable">
            <div class="confirm__toggle">
              <ion-toggle v-model="confirmOrderForm.proformaInvoice" disabled>Proforma invoice</ion-toggle>
            </div>
          </template>
          <p>Select your shipping address</p>
          <div>
            <Select label="Select Shipping Address" v-model="confirmOrderForm.shippingAddress" :options="shippingAddresses" selectkey="id" selectvalue="short_name" v-if="shippingMethods.length" />
            <small style="text-decoration: underline;" @click="openLink('/account-details')">Manage Shipping Addresses</small>
          </div>
          <div>
            <Select label="Select Shipping Method" v-model="confirmOrderForm.shippingMethod" :options="shippingMethods" selectkey="id" :selectvalue="['carrier_name', 'account_type']" v-if="shippingMethods.length" />
            <small style="text-decoration: underline;" @click="openLink('/account-details')">Manage Shipping Methods</small>
          </div>
          <ion-grid class="basket__costs" v-if="cart[purchase_type] && cart[purchase_type].totals">
            <ion-row>
              <ion-col>Sub total</ion-col>
              <ion-col>${{ cart[purchase_type].totals.items_total ?? '-' }}</ion-col>
            </ion-row>
            <ion-row v-if="purchase_type == 'purchase'">
              <ion-col>AOG fee</ion-col>
              <ion-col>${{ cart[purchase_type].totals.aog_fee ?? '-' }}</ion-col>
            </ion-row>
            <ion-row v-if="purchase_type == 'purchase'">
              <ion-col>VAT Charge</ion-col>
              <ion-col>${{ cart[purchase_type].totals.vat ?? '-' }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Order Total</ion-col>
              <ion-col>${{ cart[purchase_type].totals.total ?? '-' }}</ion-col> 
            </ion-row>
          </ion-grid>
          <div class="btn-container">
            <Button btnText="Place order" :hasGradient="true" color="secondary" btnFill="solid" expand="block" @click.prevent="placeOrder" />
            <!-- <p v-if="errorMessage" v-html="errorMessage"></p> -->
          </div>
        </div>
      </div>
    </ion-content>
    <ion-modal trigger="open-add-aircraft">
      <div class="block">
        <h3>Your order has been received</h3>
        <p>Your order has been received & will be processed shortly. Click continue to see your tracking information.</p>
      </div>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonToggle, IonBackButton, IonToolbar, IonButtons, IonHeader, IonTitle } from '@ionic/vue';
  import Select from '@/components/Select.vue';
  import Button from '@/components/Button.vue';
  import { ref, watch, onMounted } from 'vue';
  import { ShippingMethodsModel } from '@/Models/ShippingMethodsModel';
  import { ShippingAddressesModel } from '@/Models/ShippingAddressesModel';
  import cartService from '@/services/cartService';
  import { CompanyModel } from '@/Models/CompanyModel';
  import Message from '@/components/Message.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { EventBus } from '@/eventBus';

  const router = useRouter();
  const route = useRoute();

  const isCreditAvailable = ref(false);
  const isCreditExceeded = ref(false);

  const confirmOrderForm = ref({
    shippingAddress: null,
    shippingMethod: null,
    proformaInvoice: true,
    creditAccount: false,
  });

  const purchase_type = ref(route.params.type as string || 'purchase');

  watch(() => route.params.type, (newType) => {
    if (newType) {
      purchase_type.value = newType as string;
      updatePageContent();
    }
  });

  watch(() => confirmOrderForm.value.proformaInvoice, (newValue, oldValue) => {
    if (newValue) confirmOrderForm.value.creditAccount = false;
    if (!newValue) confirmOrderForm.value.creditAccount = true;
  });

  watch(() => confirmOrderForm.value.creditAccount, (newValue, oldValue) => {
    if (newValue) confirmOrderForm.value.proformaInvoice = false;
    if (!newValue) confirmOrderForm.value.proformaInvoice = true;
  });

  const shippingMethods:any = ref([]);
  const shippingMethodsModel = new ShippingMethodsModel;

  const shippingAddresses:any = ref([]);
  const shippingAddressesModel = new ShippingAddressesModel;

  const company: any = ref({});
  const companyModel = new CompanyModel();

  const cart = ref(<any>({}));
  const cartItems = ref(<any>({}));

  const errorMessage = ref(null);

  const updatePageContent = async () => {
    shippingMethods.value = await shippingMethodsModel.fetchAll();
    shippingAddresses.value = await shippingAddressesModel.fetchAll();
    cart.value = await cartService.getCart();
    cartItems.value = await cartService.getCartItems();

    company.value = await companyModel.fetch();
    console.log('company', company.value);
    isCreditAvailable.value = (company.value.credit_limit.availableAmount > cart.value[purchase_type.value].totals.total) && company.value.credit_limit.allowed == true;
    isCreditExceeded.value = company.value.credit_limit.limitExceeded == true;

    if(isCreditAvailable.value){
      confirmOrderForm.value.proformaInvoice = false;
      confirmOrderForm.value.creditAccount = true;
    }
  }

  onMounted(() => {
    updatePageContent();
  });

  const filterByKeyValue = async (obj, key, value) => {
      const foundEntry = Object.entries(obj).find(([_, nestedObj]) => nestedObj[key] === value);

      return foundEntry ? foundEntry[1] : null;
    };

    const openLink = (link) => {
      router.push(link);
    }

  const placeOrder = async () => {

    let cart_items = {};

    for(const item in cartItems.value[purchase_type.value]){
      cart_items[cartItems.value[purchase_type.value][item].id] = {
        id: cartItems.value[purchase_type.value][item].id,
        cartID: cartItems.value[purchase_type.value][item].id,
        aog: cartItems.value[purchase_type.value][item].aog,
        quantity: cartItems.value[purchase_type.value][item].quantity,
        repair_quantity: cartItems.value[purchase_type.value][item].quantity ?? 1,
        vat_check: cartItems.value[purchase_type.value][item].vat_check,
      };
    }

    const carrier: any = filterByKeyValue(shippingMethods.value, 'id', confirmOrderForm.value.shippingMethod);
    const shippingData = {
      shipping_address: shippingAddresses.value.find((address) => address.id === confirmOrderForm.value.shippingAddress),
      shipping_method: shippingMethods.value.find((method) => method.id === confirmOrderForm.value.shippingMethod),
      payment_method: confirmOrderForm.value.creditAccount ? 'credit' : 'invoice',
      cart_data: cart_items,
      cart_type: purchase_type.value,
    }

    try{
      const order = await cartService.placeOrder(shippingData);
      const order_id = order.id ?? order.repairID;

      cart.value = await cartService.getCart();
      cartItems.value = await cartService.getCartItems();

      EventBus.emit('purchaseEnquiriesUpdated', {});

      if(purchase_type.value == 'repair') {
        router.push('/order/details/' + order_id + '?isNew=true&order_type=repair');
      } else {
        router.push('/order/details/' + order_id + '?isNew=true');
      }
    } catch (error) {
        errorMessage.value = error;
    }
  }

  updatePageContent();
</script>

<style>
  h1{
    font-size: 1.25rem;
    font-weight: 600;
  }

  h1 + p{
    font-size: 0.875rem;
    color: var(--ion-color-tertiary);
    opacity: 0.6;
  }
  .btn-container{
    padding-top: 20px;
    position: sticky;
    bottom: 20px;
    z-index: 9999;
  }

  .confirm__toggle{
    background-color: #fff;
    margin-bottom: 10px;
    padding: 11px 15px;
  }

  .confirm__method-details{


  }

    .confirm__method-details ion-row{
      margin-bottom: 7px;
      font-size: 0.875rem;
    }

      .confirm__method-details ion-row:last-child{
        margin-bottom: 0;
      }

    .confirm__method-details ion-col:first-child{
      color: rgba(27, 51, 71, 0.7);
    }

    .confirm__method-details ion-col:last-child{
      text-align: right;
    }

  .basket__costs{}

  .basket__costs ion-row{
    padding: 8px 0;
    border-bottom: 1px dashed rgba(27, 51, 71, 0.1);
    font-size: 0.875rem;
    font-weight: 400;
    color: rgba(27, 51, 71, 0.7);
  }

  .basket__costs ion-row:last-child{
    font-size: 1.0625rem;
    color: rgba(27, 51, 71, 1);
    border-bottom: none;
  }

  .basket__costs ion-row ion-col:last-child{
    text-align: right;
  }

  .toggle-disabled {
    opacity: 1 !important;
  }

  .toggle-disabled {
    opacity: 1 !important;
  }

  .toggle-disabled .native-wrapper{
    opacity: .2;
  }
</style>