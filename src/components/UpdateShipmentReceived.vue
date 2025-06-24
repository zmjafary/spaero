<template>
  <Button id="present-alert" @click="openUpdateShipmentModal" btnText="Confirm Receipt" color="tertiary" expand="block" />

  <ion-alert
    trigger="present-alert"
    header="Confirm Receipt"
    message="Are you sure you want to confirm receipt of this delivery?"
    :buttons="alertButtons"
  ></ion-alert>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { IonAlert, toastController } from '@ionic/vue';
import Button from './Button.vue';
import cartService from '../services/cartService';
import GenericModal from './GenericModal.vue';
import { modalController } from '@ionic/vue';

  const alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        submitForm(false);
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        submitForm(true);
      },
    },
  ];

const props = defineProps<{ order: any }>();

const isUpdateShipmentModalOpen = ref(false);

const openUpdateShipmentModal = () => {
  isUpdateShipmentModalOpen.value = true;
};

const submitForm = async (acceptShipment) => {
  if(acceptShipment){
    cartService.updateConfirmReceipt(props.order, {
      id: props.order.id,
    });

    const modal = await modalController.create({
    component: GenericModal,
    componentProps: {
      title: 'Receipt Confirmed!',
      text: 'Your order has been successfully marked as received. Your order is now complete.'
    },
  });
  await modal.present();
  }
};
</script>