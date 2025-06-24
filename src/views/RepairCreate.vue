<template>
  <ion-page id="main-content">
    <ion-toolbar class="spaero-toolbar safe-space">
      <div class="container">
        <ion-header>
          <ion-buttons slot="start">
            <ion-back-button text="" default-href="/repair">
              <i class="fa-solid fa-chevron-left"></i>
            </ion-back-button>
          </ion-buttons>
          <ion-title>Search for a part</ion-title>
        </ion-header>
      </div>
    </ion-toolbar>
    <ion-content class="spaero-page">
      <div class="container container--narrow">
        <Message v-if="showCsvMessage" title="CSV file uploaded successfully" 
                 text="Your CSV file was uploaded successfully. The part numbers from your spreadsheet have been automatically added below" 
                 type="success" />
        <Message v-if="errorMessage" title="Error" :text="errorMessage" type="error" />
        <form class="spaero-form">
          <p class="spaero-form__text">
            Begin the purchase process by first entering the part numbers you'd like to request a quotation for.
          </p>
          <div class="spaero-form__input-with-button">
            <Input type="text" v-model="part_number_input" placeholder="Enter part number" label="Part number(s)" />
            <Button icon="fa-sharp fa-thin fa-plus" color="secondary" btnFill="outline" @click="addPartNumber"/>
          </div>
          <div class="spaero-form__tags">
            <ion-button v-for="(part_number, index) in create_rfq_form.part_numbers" :key="index" 
                        @click="removePartNumber(index)" class="spaero-form__tag" size="small" shape="round" 
                        color="tertiary" fill="outline">
              {{ part_number }}
              <i class="fa-regular fa-xmark"></i>
            </ion-button>
          </div>
          <p class="spaero-page__form-sep"><span>or</span></p>
          <Button btnText="Upload CSV File" color="secondary" btnFill="outline" expand="block" @click="triggerFileInput" />
          <input type="file" accept=".csv" ref="csvInput" @change="handleCsvUpload" style="display: none;" />
          <Select label="Select Aircraft" v-model="create_rfq_form.fleetID" v-if="aircrafts.length" 
                  :options="aircrafts" selectkey="id" selectvalue="registration" />
          <p class="spaero-form__help-text">Select an aircraft reg to send with your enquiry.</p>
          <Checkbox label="Aircraft on ground" v-model="create_rfq_form.aircraft_on_ground" />
          <div class="btn-container">
            <Button btnText="Continue" :hasGradient="true" color="secondary" btnFill="solid" expand="block" @click="savePurchaseRfq" />
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonButton, IonToolbar, IonBackButton, IonButtons, IonTitle, IonHeader, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import Papa from 'papaparse';
import Input from '@/components/Input.vue';
import Select from '@/components/Select.vue';
import Checkbox from '@/components/Checkbox.vue';
import Button from '@/components/Button.vue';
import Message from '@/components/Message.vue';
import { useRouter } from 'vue-router';
import { RepairRfqModel } from '@/Models/RepairRfqModel';
import { AircraftModel } from '@/Models/AircraftModel';

const router = useRouter();
const purchaseRfqModel = new RepairRfqModel();
const aircraftModel = new AircraftModel();
const aircrafts = ref([]);
const part_number_input = ref('');
const create_rfq_form:any = ref({
  part_numbers: [],
  part_number: null,
  fleetID: null,
  aircraft_on_ground: false
});
const errorMessage = ref('');
const showCsvMessage = ref(false);
const csvInput = ref(null);

const updatePageContent = async () => {
  aircrafts.value = await aircraftModel.fetchAll();
};
onMounted(updatePageContent);

const addPartNumber = () => {
  if (part_number_input.value) {
    create_rfq_form.value.part_numbers.push(part_number_input.value.trim());
    part_number_input.value = '';
  }
};

const removePartNumber = (index) => {
  create_rfq_form.value.part_numbers.splice(index, 1);
};

const triggerFileInput = () => csvInput.value.click();

const handleCsvUpload = (event) => {
  const file = event.target.files[0];
  if (file) parseCsv(file);
};

const parseCsv = (file) => {
  Papa.parse(file, {
    complete: (results) => {
      results.data.forEach(row => {
        if (row[0]) create_rfq_form.value.part_numbers.push(row[0].trim());
      });
      showCsvMessage.value = true;
    },
    error: (error) => {
      errorMessage.value = `Error parsing CSV file: ${error.message}`;
    }
  });
};

const savePurchaseRfq = async () => {
  try {
    addPartNumber();
    create_rfq_form.value.part_number = create_rfq_form.value.part_numbers;
    const rfq = await purchaseRfqModel.create(create_rfq_form.value);
    router.push(`/repair/rfqs/${rfq.id}?isNew=true`);
  } catch (error) {
    errorMessage.value = error.toString();
  }
};
</script>

<style>
.spaero-toolbar{
 --background: var(--ion-color-primary);
 color: #fff;
}

.spaero-toolbar ion-back-button{
 --color: #fff;
}

.spaero-form__tags{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
}

.spaero-form__tag{
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

  .spaero-form__tag i{
    color: var(--ion-color-tertiary);
    opacity: 0.5;
    margin: 1px 0 auto 10px;
    font-size: 0.75rem;
  }

.spaero-form__tag::part(native){
  padding: 6px 12px;
  border-radius: 50px;
}

.spaero-form__tag::part(native) .button-inner{
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  gap: 10px !important;
}

.btn-container{
  padding-top: 20px;
  position: sticky;
  bottom: 20px;
  z-index: 9999;
}
</style>