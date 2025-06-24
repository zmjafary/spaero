<template>
  <Button @click="openUpdateShipmentModal" btnText="Update Shipment" color="tertiary" expand="block" />

  <ion-modal ref="modal" :is-open="isUpdateShipmentModalOpen" @did-dismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Update Outbound Shipment</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- <Message v-if="errorMessage" :text="errorMessage" type="error" /> -->
      <Input label="Serial Number" v-model="shipmentDetails.serial_number" placeholder="Enter Serial Number" />
      <Input label="Defect / Comment" v-model="shipmentDetails.defect" placeholder="Enter Defect / Comment" />
      <Select
        label="Ship Status"
        v-model="shipmentDetails.ship_status"
        :options="shipStatusOptions"
        selectkey="value"
        selectvalue="label"
        placeholderText="Select Ship Status"
      />
      <Input label="Ship Date" v-model="shipmentDetails.ship_date" placeholder="Enter Ship Date" type="date" />
      <Input label="Tracking Reference" v-model="shipmentDetails.tracking_reference" placeholder="Enter a reference" />
      <Button @click="updateShipment" btnText="Save" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, toastController } from '@ionic/vue';
import Button from './Button.vue';
import Input from './Input.vue';
import Select from './Select.vue';
import cartService from '../services/cartService';

const props = defineProps<{ order: any }>();

const isUpdateShipmentModalOpen = ref(false);

const shipmentDetails = ref({
  serial_number: '',
  defect: '',
  ship_status: '',
  ship_date: '',
  tracking_reference: '',
  id: null
});

const shipStatusOptions = [
  { value: 1, label: 'Waiting Carrier Collection' },
  { value: 2, label: 'Item Shipped' }
];

const openUpdateShipmentModal = () => {
  isUpdateShipmentModalOpen.value = true;
  shipmentDetails.value.id = parseInt(props.order.id);
};

const closeModal = () => {
  isUpdateShipmentModalOpen.value = false;
};

const updateShipment = async () => {
  // Implement the logic for updating the shipment
  console.log("Update shipment", shipmentDetails.value);

  cartService.updateShipmentDetails(props.order, shipmentDetails.value);

  const toast = await toastController.create({
    message: 'Shipment has been updated!',
    duration: 1500,
    position: 'bottom',
  });

  await toast.present();
  closeModal();
};
</script>