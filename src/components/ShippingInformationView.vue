<template>
    <Input label="Short Company Name" readonly="true" v-model="shippingAddressForm.short_name" />
    <Input label="Company Name" readonly="true" v-model="shippingAddressForm.company_name" />
    <Input label="Contact Name" readonly="true" v-model="shippingAddressForm.contact_name" />
    <Input label="Contact Telephone" readonly="true" v-model="shippingAddressForm.contact_telephone" />
    <Input label="Contact Email" readonly="true" v-model="shippingAddressForm.contact_email" />
    <Input label="Address Line 1" readonly="true" v-model="shippingAddressForm.address_line1" />
    <Input label="Address Line 2 (Road)" readonly="true" v-model="shippingAddressForm.address_road" />
    <Input label="Address Line 3 (City)" readonly="true" v-model="shippingAddressForm.address_city" />
    <Input label="State" readonly="true" v-model="shippingAddressForm.state" />
    <Input label="Post/Zip Code" readonly="true" v-model="shippingAddressForm.zip_code" />
    <Input label="Country" readonly="true" v-model="shippingAddressForm.country" />
    <Input label="VAT/Tax ID" readonly="true" v-model="shippingAddressForm.vat_tax_id" />      
</template>

<script setup lang="ts">
  import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, modalController } from '@ionic/vue';
  import { ref, onBeforeMount, defineProps } from 'vue';
  import Input from '@/components/Input.vue';

  const props = defineProps([
    'shippingAddressForm'
  ]);

  console.log(props.shippingAddressForm);

</script>