<template>
  <Button id="confirmReceipt" btnText="Confirm reciept" color="tertiary" />
  <ion-alert
    trigger="confirmReceipt"
    header="Confirm receipt"
    message="Are you sure you want to confirm receipt of this delivery?"
    :buttons="alertButtons"
  ></ion-alert>
</template>

<script lang="ts" setup>
import Button from './Button.vue';
import { IonAlert, IonButton, modalController } from '@ionic/vue';
import GenericModal from './GenericModal.vue';

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {

    }
  },
  {
    text: 'Confirm',
    role: 'confirm',
    handler: () => {
      // TODO: API call to confirm receiept
      openModal();
      console.log('Confirmed!');
    }
  }
];

const openModal = async () => {
  const modal = await modalController.create({
    component: GenericModal,
    componentProps: {
      title: 'Receipt confirmed!',
      text: 'Your order has been successfully marked as received. Your order is now complete.',
    },
  });
  await modal.present();
}

</script>