<template>
  <ion-button class="filter-btn" :id="filterId" fill="outline" color="tertiary">Filter <i class="fa-regular fa-sliders"></i></ion-button>
  <ion-modal ref="modal" :trigger="filterId" @didPresent="modalPresented">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button size="large" @click="modalController.dismiss()" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
        <ion-title class="ion-text-start">Filter by</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <template v-for="(filter, index) in props.filters">

        <p class="filter-label">{{ filter.name }}</p>
        <ion-buttons>
          <ion-button 
            v-for="status in filter.values" 
            :key="status"
            fill="outline" 
            :color="filters[index] === status ? 'primary' : 'tertiary'" 
            shape="round" 
            class="filter-btn"
            @click="selectStatus(index, status)"
          >
            {{ status }}
          </ion-button>
        </ion-buttons>

      </template>

      <p class="filter-label"><a href="#" @click.prevent="clearFilters">Clear filters</a></p>
      <ion-button color="secondary" class="has-gradient" expand="block" @click="applyFilters">Save</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, modalController } from '@ionic/vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { defineComponent, ref, reactive } from 'vue';

// Define props
const props = defineProps({
  applyFilterFunction: {
    type: Function,
    default: null
  },
  filters: {
    type: Object,
    default: () => ({})
  }
});

// Generate a unique ID for this component instance
const filterId = `open-filters-${Math.random().toString(36).substring(2, 9)}`;
const modal = ref<HTMLIonModalElement>();

// Filter options
const statusOptions = ['Active', 'Pending', 'Action required', 'Closed'];
const quoteOptions = ['Active', 'Pending', 'Action required', 'Closed'];

// Current filters
const filters = reactive({
  status: '',
  quotes: ''
});

// Select status filter
const selectStatus = (index: string, status: string) => {
  filters[index] = status;
};

// Clear all filters
const clearFilters = () => {
  filters.status = '';
  filters.quotes = '';
};

// Store a reference to the presented modal
let presentedModal: any = null;

// Called when the modal is presented
const modalPresented = (event: any) => {
  presentedModal = event.target;
};

// Apply filters and close modal
const applyFilters = async () => {
  // Apply the filters if a function was provided
  
  // If a filter function was passed, call it with the filters
  if (props.applyFilterFunction) {
    props.applyFilterFunction({
      filters: { ...filters },
      sort: {},
      keepCurrentSegment: true // Flag to indicate we should stay on the current segment
    });
  }
  
  // Dismiss the modal using the stored reference
  if (presentedModal) {
    await presentedModal.dismiss();
  } else if (modal.value) {
    await modal.value.dismiss();
  } else {
    // Fallback to finding the modal in the DOM
    const modalElement = document.querySelector('ion-modal');
    if (modalElement) {
      await (modalElement as any).dismiss();
    }
  }
};
</script>

<style scoped>

ion-content{
  --ion-background-color: #fff;
}

ion-buttons{
  gap: 10px;
}

ion-button{
  --background: #fff;
  --border-radius: var(--radius);
  font-size: 0.9375rem;
  margin: 0;
}

ion-button.button-round{
  --border-radius: 100px;
}

ion-button.ion-color-primary::part(native){
  background-color: rgba(238, 30, 36, 0.1);
  color: var(--ion-color-tertiary);
}

ion-button::part(native){
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 6px;
  --padding-bottom: 6px;
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

ion-modal ion-title{
  padding-inline-start: 12px;
  font-family: var(--base-font);
  font-size: 1.25rem;
  font-weight: 600;
}

.filter-label{
  font-family: var(--base-font);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--ion-color-tertiary);
}

  .filter-label a{
    color: var(--ion-color-tertiary);
    font-weight: 400;
    font-size: 1rem;
  }

</style>
