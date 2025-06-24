<template>
  <ion-button class="filter-btn" :id="sortId" fill="outline" color="tertiary">Sort <i class="fa-regular fa-arrow-down-short-wide"></i></ion-button>
  <ion-modal ref="modal" :trigger="sortId" @didPresent="modalPresented">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button size="large" @click="modalController.dismiss()" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
        <ion-title class="ion-text-start">Sort by</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-checkbox 
          justify="space-between" 
          :checked="sortOrder === 'newest'" 
          @ionChange="setSortOrder('newest')"
        >
          <i class="fa-light fa-calendar-arrow-up"></i> Date: newest to oldest
        </ion-checkbox>
      </ion-item>
      <ion-item>
        <ion-checkbox 
          justify="space-between" 
          :checked="sortOrder === 'oldest'" 
          @ionChange="setSortOrder('oldest')"
        >
          <i class="fa-light fa-calendar-arrow-down"></i> Date: oldest to newest
        </ion-checkbox>
      </ion-item>
      <ion-button color="secondary" class="has-gradient" expand="block" @click="applySortOrder">Save</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCheckbox, IonItem, modalController } from '@ionic/vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { defineComponent, ref } from 'vue';

// Define props
const props = defineProps({
  applyFilterFunction: {
    type: Function,
    default: null
  }
});

// Generate a unique ID for this component instance
const sortId = `open-sort-${Math.random().toString(36).substring(2, 9)}`;
const modal = ref<HTMLIonModalElement>();

// Current sort order
const sortOrder = ref('');

// Set sort order
const setSortOrder = (order: string) => {
  sortOrder.value = order;
};

// Store a reference to the presented modal
let presentedModal: any = null;

// Called when the modal is presented
const modalPresented = (event: any) => {
  presentedModal = event.target;
};

// Apply sort order and close modal
const applySortOrder = async () => {
  // Apply the sort order if a function was provided
  
  // If a filter function was passed, call it with the sort order
  if (props.applyFilterFunction) {
    props.applyFilterFunction({
      filters: {},
      sort: { sortOrder: sortOrder.value },
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

ion-button{
  --background: #fff;
  --border-radius: var(--radius);
  font-size: 0.9375rem;
  margin: 0;
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
