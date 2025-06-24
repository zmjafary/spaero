<template>
  <Button v-if="!isNew" btnText="Edit" :id="'open-address-' + modalId" color="tertiary" fill="outline" expand="block" />
  <div :class="{'btn-container' : isNew}">
    <Button v-if="isNew" btnText="Add new address" :id="'open-address-' + modalId" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
  </div>
  <ion-modal ref="modal" :trigger="'open-address-' + modalId">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isNew ? 'Add New Address' : 'Edit Address' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Use the form below to enter the details of the address you want to {{ isNew ? 'add' : 'update' }}.</p>
      <Input label="Short Company Name" v-model="shippingAddressForm.short_name" />
      <Input label="Company Name" v-model="shippingAddressForm.company_name" />
      <Input label="Contact Name" v-model="shippingAddressForm.contact_name" />
      <Input label="Contact Telephone" v-model="shippingAddressForm.contact_telephone" />
      <Input label="Contact Email" v-model="shippingAddressForm.contact_email" />
      <Input label="Address Line 1" v-model="shippingAddressForm.address_line1" />
      <Input label="Address Line 2 (Road)" v-model="shippingAddressForm.address_road" />
      <Input label="Address Line 3 (City)" v-model="shippingAddressForm.address_city" />
      <Input label="State" v-model="shippingAddressForm.state" />
      <Input label="Post/Zip Code" v-model="shippingAddressForm.zip_code" />
      <Input label="Country" v-model="shippingAddressForm.country" />
      <Input label="VAT/Tax ID" v-model="shippingAddressForm.vat_tax_id" />      
      <Message v-if="errorMessage" :text="errorMessage" type="error" />
      <Button @click="saveShippingAddress" :btnText="isNew ? 'Add address' : 'Update address'" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
    </ion-content>
  </ion-modal>
</template>
  
<script setup lang="ts">
  import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, modalController } from '@ionic/vue';
  import { ref, onBeforeMount } from 'vue';
  import Button from './Button.vue';
  import Message from '@/components/Message.vue';
  import Input from '@/components/Input.vue';
  import { ShippingAddressesModel } from '@/Models/ShippingAddressesModel';

  const isNew = ref(true);
  const modalId = Math.floor(Math.random() * 9000) + 1000;
  const shippingAddressesModel = new ShippingAddressesModel();
  const errorMessage = ref(null);

  const props = defineProps(['data']);

  const shippingAddressForm: any = ref({
    short_name: props.data ? props.data.short_name : null,
    company_name: props.data ? props.data.company_name : null,
    contact_name: props.data ? props.data.contact_name : null,
    contact_telephone: props.data ? props.data.contact_telephone : null,
    contact_email: props.data ? props.data.contact_email : null,
    address_line1: props.data ? props.data.address_line1 : null,
    address_road: props.data ? props.data.address_road : null,
    address_city: props.data ? props.data.address_city : null,
    state: props.data ? props.data.state : null,
    zip_code: props.data ? props.data.zip_code : null,
    country: props.data ? props.data.country : null,
    vat_tax_id: props.data ? props.data.vat_tax_id : null
  });

  onBeforeMount(() => initializeData(props.data));

  async function initializeData(data) {
    isNew.value = data ? false : true;
  }

  const saveShippingAddress = async () => {
    try {
      const operation = isNew.value ? shippingAddressesModel.create(shippingAddressForm.value) : shippingAddressesModel.update(shippingAddressForm.value, props.data.id);
      await operation;
      closeModal();
    } catch (error) {
      errorMessage.value = error.toString();
    }
  }

  function closeModal() {
    errorMessage.value = null;
    modalController.dismiss();
  }
</script>