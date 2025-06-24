<template>
  <!-- <pre>{{data}}</pre> -->
  <div class="order-details">
    <h2>Order Details</h2>
    <ion-grid class="order-details__refs">
      <ion-row v-if="data.value.order_details">
        <ion-col>RFQ Reference</ion-col>
        <ion-col>#{{data.value.order_details[0].order.ref_num}}</ion-col>
      </ion-row>
      <ion-row v-if="data.value.order_details">
        <ion-col>Outright Purchase Order Reference</ion-col>
        <ion-col>#PO{{ orderModel.padWithZeroes(data.value.id) }}</ion-col>
      </ion-row>
      <ion-row v-if="data.value.order_details">
        <ion-col>Status</ion-col>
        <ion-col>{{ data.value.history[data.value.history.length-1].status_label }}</ion-col> <!-- TODO: Status of 1 to 4-->
      </ion-row>
      <ion-row v-if="!data.value.customer_ref">
        <ion-col><ion-button class="add-internal-order" fill="clear" @click="openModal">Add internal order reference</ion-button></ion-col>
        <ion-col></ion-col>
      </ion-row>
      <ion-row v-else>
        <ion-col>Internal Order Reference</ion-col>
        <ion-col class="has-internal-order">{{ data.value.customer_ref ? '#' + data.value.customer_ref : "--" }} <ion-button fill="clear" @click="openModal"><i class="fa-light fa-pen-to-square"></i></ion-button></ion-col>
      </ion-row>
    </ion-grid>
    <h2>Part Details</h2>
    <template v-if="data.value.order_details && data.value.order_details.length" v-for="enquiry in data.value.order_details">
      <div class="order-details__block">
        <ion-grid>
          <ion-row>
            <ion-col>Part numbers</ion-col>
            <ion-col>{{ enquiry.part_number }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>Description</ion-col>
            <ion-col>{{ enquiry.description ?? '--' }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>Serial Number</ion-col>
            <ion-col>{{ enquiry.serial_number ?? '--' }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>Quantity</ion-col>
            <ion-col>{{ data.value.order_details[0].quantity }}</ion-col>
          </ion-row>
          <ion-row v-if="enquiry.certificate_file && enquiry.certificate_file.length">
            <ion-col>Certification Link</ion-col>
            <ion-col>
              <pdf-downloader
                slot="end"
                :file-url="enquiry.certificate_file[0].url"
                button-text="Download"
                icon="book-outline"
                size="small"
                fill="outline"
                :expand="undefined"
              ></pdf-downloader>
            </ion-col>
          </ion-row>
          <ion-row v-if="enquiry.certificate_date">
            <ion-col>Certification Date</ion-col>
            <ion-col>{{ enquiry.certificate_date ?? '--' }}</ion-col>
          </ion-row>
          <ion-row v-if="enquiry.traceability_file && enquiry.traceability_file.length">
            <ion-col>Traceability Link</ion-col>
            <ion-col>
              <pdf-downloader
                slot="end"
                :file-url="enquiry.traceability_file[0].url"
                button-text="Download"
                icon="book-outline"
                size="small"
                fill="outline"
                :expand="undefined"
              ></pdf-downloader>
            </ion-col>
          </ion-row>
          <ion-row v-if="enquiry.stock_image">
            <ion-col>Stock Image</ion-col>
            <ion-col>{{ enquiry.stock_image ?? '--' }}</ion-col>
          </ion-row>
          <ion-row v-if="enquiry.outright">
            <ion-col>Price (Ea)</ion-col>
            <ion-col>${{ enquiry.outright }}</ion-col>
          </ion-row>
          <ion-row v-if="enquiry.vat">
            <ion-col>VAT Charge</ion-col>
            <ion-col>{{ enquiry.vat ?? '--' }}</ion-col> <!-- TODO: Add relationship to find this value -->
          </ion-row>
          <ion-row>
            <ion-col>Sub Total</ion-col>
            <ion-col>${{ data.value.order_details[0].cost_to_date ?? '0' }}</ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </template>
    <h2>Shipping Details</h2>
    <div class="order-details__block" v-if="data.value.shipping_method">
      <ion-grid>
        <ion-row>
          <ion-col>Shipping Account</ion-col>
          <ion-col>{{ data.value.shipping_method.carrier_name ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Ship to Address</ion-col>
          <ion-col  style="text-decoration: underline;"@click="ShowShippingInformation(data.value.shipping_address)">{{ data.value.shipping_address.short_name ?? '--' }}</ion-col>
        </ion-row>
      </ion-grid>
    </div>
    <h2>Supplier Details</h2>
    <div class="order-details__block" v-if="data.value.supplier_company">
      <ion-grid>
        <ion-row>
          <ion-col>Supplier Name</ion-col>
          <ion-col>{{ data.value.supplier_company.company_name ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Address Line 1</ion-col>
          <ion-col>{{ data.value.supplier_company.address_line1 ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Address Line 2</ion-col>
          <ion-col>{{ data.value.supplier_company.address_line2 ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>City</ion-col>
          <ion-col>{{ data.value.supplier_company.city ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Country</ion-col>
          <ion-col>{{ data.value.supplier_company.country_code ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Postcode</ion-col>
          <ion-col>{{ data.value.supplier_company.zip_code ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Contact Name</ion-col>
          <ion-col>{{ data.value.supplier_company.primary_user.first_name ?? '--' }} {{ data.value.supplier_company.primary_user.last_name ?? '' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Phone Number</ion-col>
          <ion-col>{{ data.value.supplier_company.primary_user.phone_number ?? '--' }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Email Address</ion-col>
          <ion-col>{{ data.value.supplier_company.notification_email_address ?? '--' }}</ion-col>
        </ion-row>
      </ion-grid>
    </div>
    <ion-grid class="order-details__refs" v-if="data.value.supplier_company">
      <ion-row>
        <ion-col>Cost to date</ion-col>
        <ion-col>${{ data.value.order_details[0].cost_to_date ?? '0' }}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>AOG fee</ion-col>
        <ion-col>${{ data.value.order_details[0].aog_fee ?? '0' }}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>VAT Charge</ion-col>
        <ion-col>$0</ion-col> <!-- Todo: Ask Rob -->
      </ion-row>
      <ion-row>
        <ion-col>Order Total</ion-col>
        <ion-col>${{ data.value.order_details[0].cost_to_date ?? '0' }}</ion-col>
      </ion-row>
    </ion-grid>
    <Button btnText="Download" icon="fa-light fa-file-lines" color="tertiary" btnFill="outline" expand="block" :hasGradient="false" :callback="downloadOrderInvoice"  />
    <div class="order-details__contact">
      <p>If you’ve made a mistake during the ordering process, please create a support ticket using the link below and a member of our team will reach out to assist.</p>
      <Button btnText="Contact us" icon="fa-light fa-file-lines" color="tertiary" btnFill="outline" expand="block" :hasGradient="false"  />
    </div>
    <ion-modal ref="modal" :is-open="isModalOpen" @did-dismiss="closeModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Internal Order Reference</ion-title>
          <ion-buttons slot="end">
            <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>Use the form below to enter your internal order reference.</p>
        <!-- <Message v-if="errorMessage" :text="errorMessage" type="error" /> -->
        <Input label="Internal order reference" v-model="data.value.customer_ref" placeholder="Enter a reference" />
        <Button @click="updateInternalRef" btnText="Save" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
      </ion-content>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
  import cartService from '@/services/cartService';
  import { IonGrid, IonRow, IonCol, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, modalController, toastController } from '@ionic/vue';
  import Button from './Button.vue';
  import Input from './Input.vue';
  import { ref } from 'vue';
  import { OrderModel } from '@/Models/OrderModel';
  import ShippingInformationView from './ShippingInformationView.vue';
  import GenericModal from './GenericModal.vue';
  import PdfDownloader from './PdfDownloader.vue';

  const errorMessage = ref(null);
  const orderModel = new OrderModel;

  const props = defineProps([
    'data'
  ]);

  console.log(props.data);

  const downloadOrderInvoice = async () => {
    cartService.downloadOrderInvoice(props.data.value.id);
  }

  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  }

  const closeModal = () => {
    errorMessage.value = null;
    isModalOpen.value = false;
  }

  const updateInternalRef = async () => {
    cartService.updateInternalRef(props.data.value);

        const toast = await toastController.create({
          message: 'Internal Reference has been updated!',
          duration: 1500,
          position: 'bottom',
        });

        await toast.present();
        closeModal();
  }

  const ShowShippingInformation = async (shippingMethod) => {
    console.log(shippingMethod);
    
    const modal = await modalController.create({
      component: GenericModal,
      componentProps: {
        title: 'Shipping Information!',
        component: ShippingInformationView,
        compProps: {
          fromMessage: true,
          shippingAddressForm: shippingMethod
        }
      },
    });
    await modal.present();
  }


</script>

<style>

.add-internal-order, .has-internal-order ion-button{
  --padding-top: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  --padding-end: 0;
  margin: 0;
  min-height: 100%;
  font-size: 0.875rem;
  --border-radius: 0;
}

.has-internal-order i{
  color: var(--ion-color-primary);
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.order-details{
  width: 100%;
}

  .order-details h2{
    font-weight: 600;
    font-size: 0.9375rem;
    margin: 0 0 5px;
  } 

  .order-details__refs{
    margin-bottom: 20px;
    color: rgba(27, 51, 71, 0.7);
    font-size: 0.875rem;
  }

    .order-details__refs ion-row{
      border-bottom: 1px dashed rgba(27, 51, 71, 0.1);
    }

    .order-details__refs ion-col{
      padding: 8px 0;
    }

    .order-details__refs ion-row ion-col:last-child{
      text-align: right;
      font-weight: 600;
    }

  .order-details__block{
    margin: 10px 0 20px;
    background-color: var(--ion-color-primary-contrast);
    font-size: 0.875rem;
  }

    .order-details__block ion-col{
      padding: 10px 15px;
      color: rgba(27, 51, 71, 0.7);
    }

    .order-details__block ion-col:last-child{
      text-align: right;
      color: rgba(27, 51, 71, 1);
      font-weight: 600;
    }

  .order-details__contact{
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 15px;
    font-size: 0.875rem;
    color: rgba(27, 51, 71, 1);
    margin-top: 20px;
  }

    .order-details__contact p{
      margin: 0 0 10px;
    }
</style>