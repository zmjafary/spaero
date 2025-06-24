<template>
  <Button id="accept-delivery" btnText="Accept delivery" color="tertiary" />
  <Button btnText="Contact us" color="tertiary" :hasGradient="false" fill="outline" />
  <ion-alert
    trigger="accept-delivery"
    header="Accept delivery"
    message="Are you sure you want to confirm acceptance of this delivery?"
    :buttons="alertButtons"
  ></ion-alert>
</template>

<script lang="ts" setup>
import Button from './Button.vue';
import { IonAlert, modalController } from '@ionic/vue';
import GenericModal from './GenericModal.vue';
import ReturnShipment from './ReturnShipment.vue';

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {

    }
  },
  {
    text: 'Accept',
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
      title: 'Delivery accepted!',
      text: 'Your order has been successfully marked as received. Your order is now complete.',
      component: ReturnShipment,
      compProps: {
        fromMessage: true
      }
    },
  });
  await modal.present();
}

</script>