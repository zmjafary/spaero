<template>
  <Button id="switchSale" btnText="Switch to outright sale" color="tertiary" btnFill="outline" icon="fa-light fa-arrows-repeat" />
  <ion-modal trigger="switchSale">
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-start">Switch to Outright Sale</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Are you sure you want to switch this order to be an outright sale? Below is a breakdown of the final order total:</p>
      <Button btnText="Confirm" color="secondary" :hasGradient="true" expand="block" />
      <Button btnText="Cancel" color="tertiary" :hasGradient="false" expand="block" btnFill="outline" @click="closeModal" />
    </ion-content>
  </ion-modal>
</template>

<script lang="ts" setup>
import Button from './Button.vue';
import { IonModal, IonToolbar, IonContent, modalController, IonTitle, IonHeader, IonButtons, IonButton } from '@ionic/vue';


function closeModal() {
  modalController.dismiss();
}

</script>

<style scoped>
ion-content{
  --ion-background-color: #fff;
  border-top: 1px solid rgba(242, 241, 248, 1);
  --padding-top: 20px;
  --padding-bottom: 20px;
  --padding-start: 20px;
  --padding-end: 20px;
}

ion-modal ion-title{
  padding-inline-start: 12px;
  font-family: var(--base-font);
  font-size: 1.25rem;
  font-weight: 600;
}

p{
  color: rgba(27, 51, 71, 0.6);
  font-size: 0.875rem;
  line-height: 1.42em;
  margin-bottom: 20px;
  margin-top: 0;
}
</style>