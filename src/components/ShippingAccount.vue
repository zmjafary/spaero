<template>
  <Button v-if="!isNew" btnText="Edit" :id="'open-address-' + modalId" color="tertiary" fill="outline" expand="block" />
  <div :class="{'btn-container' : isNew}">
    <Button v-if="isNew" btnText="Add new account" :id="'open-address-' + modalId" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
  </div>
  <ion-modal ref="modal" :trigger="'open-address-' + modalId">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isNew ? 'Add New Account' : 'Edit Account' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Use the form below to enter the details of the shipping account you want to {{ isNew ? 'add' : 'update' }}.</p>
      <Select label="Carrier Name" v-model="shippingAddressForm.carrier_name" :options="carrierTypes" selectkey="name" selectvalue="name" />
      <Select label="Account Type" v-model="shippingAddressForm.account_type" :options="carrierAccountTypes" selectkey="name" selectvalue="name" />
      <Input label="Account Number" v-model="shippingAddressForm.account_number" />
      <Input label="Zip Code" v-model="shippingAddressForm.zip_code" />
      <Input label="Service Level" v-model="shippingAddressForm.service_level" />
      <Input label="Contact Email" v-model="shippingAddressForm.contact_email" />
      <Select label="Insure" v-model="shippingAddressForm.insure" :options="insureOptions" selectkey="id" selectvalue="name" />
      <Message v-if="errorMessage" :text="errorMessage" type="error" />
      <Button @click="saveShippingAddress" :btnText="isNew ? 'Add address' : 'Update address'" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
    </ion-content>
  </ion-modal>
</template>
  
<script setup lang="ts">
  import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, modalController } from '@ionic/vue';
  import { ref, onBeforeMount } from 'vue';
  import Select from './Select.vue';
  import Button from './Button.vue';
  import Message from '@/components/Message.vue';
  import Input from '@/components/Input.vue';
  import { ShippingAddressesModel } from '@/Models/ShippingAddressesModel';
  import { CarrierTypesModel } from '@/Models/CarrierTypesModel';
  import { CarrierAccountTypesModel } from '@/Models/CarrierAccountTypesModel';
  import { ShippingMethodsModel } from '@/Models/ShippingMethodsModel';
  import { EventBus } from '@/eventBus';

  const isNew = ref(true);
  const modalId = Math.floor(Math.random() * 9000) + 1000;
  const shippingAddressesModel = new ShippingMethodsModel();
  const errorMessage = ref(null);

  const carrierTypesModel = new CarrierTypesModel();
  const carrierTypes = ref([]);

  const carrierAccountTypesModel = new CarrierAccountTypesModel(); 
  const carrierAccountTypes = ref([]);

  const insureOptions = [
    { id: 'Yes', name: 'Yes' },
    { id: 'No', name: 'No' },
  ];

  const props = defineProps(['data']);

  const shippingAddressForm: any = ref({
    carrier_name: props.data ? props.data.carrier_name : null,
    account_type: props.data ? props.data.account_type : null,
    account_number: props.data ? props.data.account_number : null,
    zip_code: props.data ? props.data.zip_code : null,
    service_level: props.data ? props.data.service_level : null,
    contact_email: props.data ? props.data.contact_email : null,
    insure: props.data ? props.data.insure : null,
  });

  onBeforeMount(() => initializeData(props.data));

  async function initializeData(data) {
    isNew.value = data ? false : true;
    carrierTypes.value = await carrierTypesModel.fetchAll();
    carrierAccountTypes.value = await carrierAccountTypesModel.fetchAll();

    console.log(carrierTypes.value);
  }

  const saveShippingAddress = async () => {
    try {
      const operation = isNew.value ? shippingAddressesModel.create(shippingAddressForm.value) : shippingAddressesModel.update(shippingAddressForm.value, props.data.id);
      await operation;
      EventBus.emit('aircraftAdded', {});
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