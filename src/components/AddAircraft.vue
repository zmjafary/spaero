<template>
  <Button v-if="!isNew && type != 'basic'" btnText="Edit" :id="'open-add-aircraft-' + modalId" color="tertiary" fill="outline" expand="block" />
  <div :class="{'btn-container' : isNew}" v-if="type != 'basic'">
    <Button v-if="isNew && type != 'basic'" btnText="Add new aircraft" :id="'open-add-aircraft-' + modalId" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
  </div>
  <small style="text-decoration: underline;" v-if="isNew && type == 'basic'" btnText="Add" :id="'open-add-aircraft-' + modalId">Add Aircraft</small>
  <ion-modal ref="modal" :trigger="'open-add-aircraft-' + modalId">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isNew ? 'Add New Aircraft' : 'Edit Aircraft' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Use the form below to enter the details of the aircraft you want to {{ isNew ? 'add' : 'update' }}.</p>
      <Message v-if="errorMessage" :text="errorMessage" type="error" />
      <Select label="Manufacturer" v-model="manufacturerId" v-if="aircraftType.length" :options="aircraftType" selectkey="id" selectvalue="manufacturer" @update:model-value="setAircraftModels" />
      <Select label="Model" :options="models" :disabled="!models.length" selectkey="id" selectvalue="type_series" v-model="createAircraftForm.aircraft_type_id" />
      <Input label="Registration/MSN" v-model="createAircraftForm.registration" />
      <Message v-if="errorMessage" :text="errorMessage" type="error" />
      <Button @click="addAircraft" :btnText="isNew ? 'Add new aircraft' : 'Update aircraft'" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
  import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, modalController } from '@ionic/vue';
  import { ref, onBeforeMount } from 'vue';
  import Button from './Button.vue';
  import Input from './Input.vue';
  import Select from './Select.vue';
  import Message from '@/components/Message.vue';
  import { AircraftModel } from '@/Models/AircraftModel';
  import { AircraftTypesModel } from '@/Models/AircraftTypesModel';
  import { EventBus } from '@/eventBus';

  const modalId = Math.floor(Math.random() * 9000) + 1000;
  const isNew = ref(true);
  const manufacturerId = ref(null);
  const models = ref([]);
  const errorMessage = ref(null);
  const aircraftType = ref([]);
  const createAircraftForm = ref({
    id: null,
    aircraft_type_id: null,
    registration: null,
  });

  const aircraftTypeModel = new AircraftTypesModel();
  const aircraftModel = new AircraftModel();

  async function initializeData(data) {
    if (data && data.registration) {
      isNew.value = false;
      createAircraftForm.value = { ...data };
      aircraftType.value = await aircraftTypeModel.fetchAll();
      manufacturerId.value = data.aircraft_type.aircraft_manufacture.id;
      setAircraftModels(data.aircraft_type.aircraft_manufacture.id);
    } else {
      isNew.value = true;
      aircraftType.value = await aircraftTypeModel.fetchAll();
    }
  }

  const props = defineProps(['data', 'type']);
  onBeforeMount(() => initializeData(props.data));

  function setAircraftModels(newId) {
    const selectedType = aircraftType.value.find(type => parseInt(type.id) == parseInt(newId));
    models.value = selectedType ? selectedType.aircraft_type : [];
  }

  async function addAircraft() {
    try {
      const operation = isNew.value ? aircraftModel.create(createAircraftForm.value) : aircraftModel.update(createAircraftForm.value, createAircraftForm.value.id);
      await operation;
      EventBus.emit('aircraftAdded', createAircraftForm.value);
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

<style scoped>

ion-content{
  --ion-background-color: #fff;
  border-top: 1px solid rgba(242, 241, 248, 1);
}

  ion-content p:first-child{
    margin-top: 0;
    color: rgba(27, 51, 71, 0.7);
    font-size: 0.875rem;
  }

ion-button{
  --background: #fff;
  --border-radius: var(--radius);
  margin: 0;
}

ion-select, ion-input{
  margin-bottom: 1em;
}


ion-button.filter-btn:not(.ion-color-primary)::part(native){
  background-color: #fff;
  border: 1px solid rgba(27, 51, 71, 0.1);
  padding: 10px 15px;
}

ion-button.filter-btn i{
  opacity: 0.5;
  margin-left: 10px;
}

ion-item{
  --padding-start: 0;
  --padding-end: 0;
  --border-color: transparent;
}

ion-checkbox::part(container){
  border-radius: 50%;
}

</style>