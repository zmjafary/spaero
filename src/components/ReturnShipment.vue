<template>
  <Button v-if="compProps.fromMessage" id="return-shipment" btnText="Return core shipment" color="secondary" :has-gradient="true" expand="block" />
  <Button v-else id="return-shipment" btnText="Return core shipment" color="tertiary" expand="block" />
  <ion-modal trigger="return-shipment">
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-start">Core Shipment Details</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Use the form below to enter the details of your return core shipment for repair.</p>
      <Button btnText="Update order" color="secondary" :hasGradient="true" expand="block" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
  import { IonModal, IonToolbar, IonContent, modalController, IonTitle, IonHeader, IonButtons, IonButton } from '@ionic/vue';
  import Button from './Button.vue';

  const props = defineProps({
    compProps: Object
  });

  function closeModal() {
    modalController.dismiss();
  }
</script>

<style scoped>
ion-content{
  --ion-background-color: #fff;
  border-top: 1px solid rgba(242, 241, 248, 1);
}
</style>