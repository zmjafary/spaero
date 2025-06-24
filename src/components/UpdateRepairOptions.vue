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
        <Checkbox :checked="selectedOption === 'overhaul'" @change="(isChecked) => updateSelection('overhaul', isChecked)" label="Proceed with overhaul" />
        <p>Overhaul cost <strong>$51.00</strong></p>
        <p>Total <strong>$51.00</strong></p>
      </div>

      <div class="repair-option">
        <Checkbox :checked="selectedOption === 'certification'" @change="(isChecked) => updateSelection('certification', isChecked)" label="Proceed with certification" />
        <p>Certification cost <strong>$51.00</strong></p>
        <p>Total <strong>$51.00</strong></p>
      </div>

      <div class="repair-option">
        <Checkbox :checked="selectedOption === 'return'" @change="(isChecked) => updateSelection('return', isChecked)" label="Return as is" />
      </div>

      <div class="repair-option">
        <Checkbox :checked="selectedOption === 'scrap'" @change="(isChecked) => updateSelection('scrap', isChecked)" label="Scrap on site" />
        <p>Scrap Cost <strong>$51.00</strong></p>
        <p>Total <strong>$51.00</strong></p>
      </div>


      <div class="repair-terms">
        <p>Once this decision has been made it can not be changed.</p>
        <p>You should pay an additional charge of $51.00 for any reapirs</p>
      </div>
      <Button btnText="Confirm" color="secondary" :callback="submitForm" :hasGradient="true" expand="block" />
    </ion-content>
  </ion-modal> 
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, modalController } from '@ionic/vue';
import Button from './Button.vue';
import Checkbox from './Checkbox.vue';
import { ref } from 'vue';
import cartService from '@/services/cartService';
import GenericModal from './GenericModal.vue';
import { toastController } from '@ionic/vue';

const props = defineProps([
  'order'
]);

const form = ref({
  id: null,
  customer_instruction: null,
});

const selectedOption = ref(null);

function updateSelection(option: string, isChecked: boolean) {
  if (isChecked) {
    selectedOption.value = option;
    form.value.customer_instruction = option;
  } else if (selectedOption.value === option) {
    selectedOption.value = null;
    form.value.customer_instruction = null;
  }
}

const submitForm = async () => {
  let submission_value = null;
  let title = '';
  let message = '';
  switch(selectedOption.value) {
    case 'overhaul':
      submission_value = 2;
      title = 'Repair confirmed!';
      message = 'Your repair option has been successfully updated and sent to the distributor. You will receive a notification when the repair is complete.';
      break;
    case 'certification':
      submission_value = 1;
      title = 'Repair confirmed!';
      message = 'Your repair option has been successfully updated and sent to the distributor. You will receive a notification when the repair is complete.';
      break;
    case'return':
      submission_value = 3;
      title = 'Return confirmed!';
      message = 'Your repair order will now be sent back to you.';
      break;
    case 'scrap':
      submission_value = 4;
      title = 'Scrap confirmed!';
      message = 'Your repair order will now be scrapped on site. You will be notified when your order has been scrapped by our distributors.';
      break;
  }

  form.value.customer_instruction = submission_value;
  form.value.id = props.order.id;

  cartService.updateRepairDetails(props.order, form.value)
  closeModal();

  const modal = await modalController.create({
    component: GenericModal,
    componentProps: {
      title: title,
      text: message
    },
  });
  await modal.present();
};

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

  .repair-option {
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

  .repair-option:has(:checked) {
    border-color: rgba(238, 30, 36, 1);
  }

  .repair-option ion-checkbox{
    color: rgba(27, 51, 71, 1);
    font-size: 0.9375rem;
    font-weight: 600;
  }

  .repair-option p {
    margin: 0;
    padding-left: 31px; /* Align with the checkbox label */
  }

  .repair-option strong{
    color: rgba(27, 51, 71, 1);
  }

.repair-terms{
  font-size: 0.875rem;
  color: rgba(27, 51, 71, 0.7);
}

</style>