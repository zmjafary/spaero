<template>

  <Message v-if="safeData && showUpdateShipmentButton"
    icon="fa-solid fa-truck"
    type="warning" title="Update Shipment Details" 
    text="It’s time to send off your repair. Use the link below to begin this process and ship your item." 
    :component="UpdateShipment" 
    :component-props="{order: safeData}">
  </Message>

  <Message v-if="safeData && showProceedOptionsButton"
    icon="fa-solid fa-truck"
    type="warning" title="Your repair options have been updated" 
    text="Your repair details have been updated. Use the button below to view your repair details and select an option that suits your needs." 
    :component="UpdateRepairOptions" 
    :component-props="{order: safeData}">
  </Message>

  <Message v-if="safeData && showShipmentReceivedButton"
    icon="fa-solid fa-truck"
    type="warning" title="Update Shipment Received" 
    text="Your order has been shipped and should be with you shortly. Click here to see your tracking information." 
    :component="UpdateShipmentReceived" 
    :component-props="{order: safeData}">
  </Message>

  <div class="order-details">
    <h2>Repair Order Details</h2>
    <ion-grid class="order-details__refs">
      <ion-row>
        <ion-col>Repair Order Reference</ion-col>
        <ion-col>#RO{{ orderModel.padWithZeroes(safeData.id) }}</ion-col>
      </ion-row>
      <ion-row v-if="safeData.history && safeData.history.length">
        <ion-col>Status</ion-col>
        <ion-col>
          <ion-badge color="success" style="color: white;">
            {{ safeData.history[0].status_label }}
          </ion-badge>
        </ion-col>
      </ion-row>
      <ion-row v-if="!safeData.customer_ref">
        <ion-col><ion-button class="add-internal-order" fill="clear" @click="openModal">Add internal order reference</ion-button></ion-col>
        <ion-col></ion-col>
      </ion-row>
      <ion-row v-else>
        <ion-col>Internal Order Reference</ion-col>
        <ion-col class="has-internal-order">
          {{ '#' + safeData.customer_ref }}
          <ion-button fill="clear" @click="openModal"><i class="fa-light fa-pen-to-square"></i></ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    <h2>Part Details</h2>
    <template v-if="data.value.enquires">
      <div class="order-details__block">
        <ion-grid>
          <ion-row>
            <ion-col>Part numbers</ion-col>
            <ion-col>{{ data.value.enquires.part_number }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>Description</ion-col>
            <ion-col>{{ data.value.enquires.description ?? '--' }}</ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </template>
    <h2>Quote Details</h2>
    <template v-if="data.value.enquires">
      <div class="order-details__block">
        <ion-grid>
          <ion-row>
            <ion-col>Test, Teardown & Evaluation</ion-col>
            <ion-col>${{ data.value.enquires.bench_check_price ?? '--' }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>DEF/CMNTs</ion-col>
            <ion-col>{{ data.value.enquires.comments ?? '--' }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>Test & Certification</ion-col>
            <ion-col>{{ data.value.enquires.test_certify ?? '--' }}</ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </template>
    <h2>Shipping Details</h2>
    <div class="order-details__block" v-if="data.value.shipping_method">
      <ion-grid>
        <ion-row>
          <ion-col>Shipping Account</ion-col>
          <ion-col>{{ data.value.shipping_method.carrier_name ?? '--' }}</ion-col> <!-- TODO: link to the page -->
        </ion-row>
        <ion-row>
          <ion-col>Ship to Address</ion-col>
          <ion-col>{{ data.value.shipping_address.short_name ?? '--' }}</ion-col> <!-- TODO: link to the page -->
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
        <ion-row>
          <ion-col>Quality Review</ion-col>
          <ion-col>{{ data.value.supplier_company.quality_contact ?? '--' }}</ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <ion-grid class="order-details__refs" v-if="data.value.supplier_company">
      <ion-row v-if="data.value.order_details">
        <ion-col>Cost to date</ion-col>
        <ion-col>${{ data.value.cost_to_date ?? '0' }}</ion-col>
      </ion-row>
      <ion-row v-if="data.value.order_details">
        <ion-col>AOG fee</ion-col>
        <ion-col>${{ data.value.aog_fee ?? '0' }}</ion-col>
      </ion-row>
      <ion-row v-if="data.value.order_details">
        <ion-col>VAT Charge</ion-col>
        <ion-col>$0</ion-col> <!-- Todo: Ask Rob -->
      </ion-row>
    </ion-grid>

    <Button btnText="Download" icon="fa-light fa-file-lines" color="tertiary" btnFill="outline" expand="block" :hasGradient="false" :callback="downloadOrderInvoice"  />
    <div class="order-details__contact">
      <p>If you've made a mistake at all during your order process, please create a support ticket here or use the live chat function to speak to our customer support team.</p>
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
        <p>Use the form below to update the outbound shipment details.</p>
        <!-- <Message v-if="errorMessage" :text="errorMessage" type="error" /> -->
        <Input label="Internal order reference" v-model="data.value.customer_ref" placeholder="Enter a reference" />
        <Button @click="updateInternalRef" btnText="Save" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
      </ion-content>
    </ion-modal>

  </div>
</template>

<script setup lang="ts">
  import cartService from '@/services/cartService';
  import { IonGrid, IonRow, IonCol, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonBadge, modalController, toastController } from '@ionic/vue';
  import Button from './Button.vue';
  import Input from './Input.vue';
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { RepairOrderModel } from '@/Models/RepairOrderModel';
  import Message from './Message.vue';
  import UpdateRepairOptions from './UpdateRepairOptions.vue';
  import UpdateShipment from './UpdateShipment.vue';
  import UpdateShipmentReceived from './UpdateShipmentReceived.vue';

  const errorMessage = ref(null);
  const orderModel = new RepairOrderModel();

  const props = defineProps(['data']);

  console.log(props.data);

  // Create a computed property for safe data access
  const safeData = computed(() => props.data?.value || {});

  const showUpdateShipmentButton = computed(() => {
    console.log(safeData.value);
    if (!safeData.value) return false;

    const orderStatus = safeData.value.order_status;
    const repairStatus = safeData.value.repair_status;
    const customerInstruction = safeData.value.customer_instruction;

    return (
      orderStatus === 3 || orderStatus === 10 || orderStatus === 11
    );
  });

  const showProceedOptionsButton = computed(() => {
    if (!safeData.value) return false;

    const orderStatus = safeData.value.order_status;
    const repairStatus = safeData.value.repair_status;
    const customerInstruction = safeData.value.customer_instruction;

    return (
      safeData.value.customer_instruction == 0 &&
      orderStatus === 4
    );
  });

  const showShipmentReceivedButton = computed(() => {
    if (!safeData.value) return false;

    const orderStatus = safeData.value.order_status;
    const repairStatus = safeData.value.repair_status;
    const customerInstruction = safeData.value.customer_instruction;

    console.log(orderStatus);

    return (
      orderStatus === 13
    );
  });

  const updateShipment = () => {
    // Implement the logic for updating the shipment
    console.log("Update shipment button clicked");
  };

  const downloadOrderInvoice = async () => {
    cartService.downloadOrderInvoice(props.data.value.id);
  }

  const isModalOpen = ref(false);
  const isUpdateShipmentModalOpen = ref(false);

  const shipmentDetails = ref({
    serialNumber: '',
    shipStatus: '',
    defect: '',
    ship_status: '',
    tracking_reference: ''
  });

  const shipStatusOptions = [
    { value: 1, label: 'Waiting Carrier Collection' },
    { value: 2, label: 'Item Shipped' }
  ];

  const openModal = () => {
    isModalOpen.value = true;
  }

  const openUpdateShipmentModal = () => {
    isUpdateShipmentModalOpen.value = true;
  }

  const closeModal = () => {
    errorMessage.value = null;
    isModalOpen.value = false;
    isUpdateShipmentModalOpen.value = false;
  }

  const updateInternalRef = async () => {
    cartService.updateInternalRef(props.data.value, 'repair');

    const toast = await toastController.create({
      message: 'Internal Reference has been updated!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
    closeModal();
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