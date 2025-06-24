<template>
  <Button id="showRepairOption" btnText="Select a repair option" color="tertiary"  />
  <ion-modal ref="modal" trigger="showRepairOption">
    <ion-header>
      <ion-toolbar>
        <ion-title slot="start">Your Repair Options</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- TODO: Loop through repair options -->
      <!-- TODO: Wire up checkbox with values -->
      <div class="repair-option">
        <Checkbox label="Proceed with certification" />
        <p>Certification cost <strong>$51.00</strong></p>
        <p>Total <strong>$51.00</strong></p>
      </div>
      <div class="repair-terms">
        <p>Once this decision has been made it can not be changed.</p>
        <p>You should pay an additional charge of $51.00 for any reapirs</p>
      </div>
      <Button btnText="Confirm" color="secondary" :hasGradient="true" expand="block" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, modalController } from '@ionic/vue';
import Button from './Button.vue';
import Checkbox from './Checkbox.vue';

function closeModal() {
    modalController.dismiss();
  }
</script>

<style scoped>
ion-content{
  --ion-background-color: #fff !important;
  border-top: 1px solid rgba(242, 241, 248, 1);
}

ion-title{
  text-align: left;
}

.repair-option{
  margin: 15px 0;
  border: 1px solid rgba(0, 0, 0, 0.07);
  padding: 10px;
  font-size: 0.875rem;
  color: rgba(27, 51, 71, 0.7);
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 4px;
}

  .repair-option:has(.checkbox-checked){
    border-color: rgba(238, 30, 36, 1);
  }

  .repair-option ion-checkbox{
    color: rgba(27, 51, 71, 1);
    font-size: 0.9375rem;
    font-weight: 600;
  }

  .repair-option p{
    margin: 0;
  }

  .repair-option strong{
    color: rgba(27, 51, 71, 1);
  }

.repair-terms{
  font-size: 0.875rem;
  color: rgba(27, 51, 71, 0.7);
}

</style>