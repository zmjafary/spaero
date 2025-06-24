<template>
  <ion-page id="main-content">
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
          :pulling-icon="chevronDownCircleOutline"
          pulling-text="Pull to refresh"
          refreshing-spinner="circles"
          refreshing-text="Refreshing...">
        </ion-refresher-content>
      </ion-refresher>
      <TopMenuBar />
      <div class="container">
        <Message v-if="hasNewAircraft" title="Aircraft successfully created" type="success" />
        <Message v-if="hasDeletedAircraft" title="Aircraft successfully deleted" type="success" />
        <h1>Account details</h1>
        <p>Lectus non varius gravida fermentum volutpat. Vel massa quis phasellus neque donec at.</p>
      </div>
      <HomeContent :segments="segments" />

      <small style="text-align: center; margin: 0 auto; display: block; margin-bottom: 15px;">v 1.2.26</small>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import TopMenuBar from '@/components/TopMenuBar.vue';
import Message from '@/components/Message.vue';
import HomeContent from '@/components/HomeContent.vue';
import CompanyProfile from '@/components/CompanyProfile.vue';
import AddAircraft from '@/components/AddAircraft.vue';
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue';
import { EventBus } from '@/eventBus';
import { AircraftModel } from '@/Models/AircraftModel';
import { Segment } from '@/types/Segment';
import { ShippingAddressesModel } from '@/Models/ShippingAddressesModel';
import ShippingInformation from '@/components/ShippingInformation.vue';
import ShippingAccount from '@/components/ShippingAccount.vue';
import { ShippingMethodsModel } from '@/Models/ShippingMethodsModel';

const hasNewAircraft = ref(false);
const hasDeletedAircraft = ref(false);
const aircraftCards = ref([]);
const aircraftsModel = new AircraftModel();
const shippingAddressesCards = ref([]);
const shippingAddressesModel = new ShippingAddressesModel();
const shippingMethodsCards = ref([]);
const shippingMethodsModel = new ShippingMethodsModel();

const segments: any = ref([
  {
    title: 'Company Profile',
    value: 'company-profile',
    icon: 'fa-light fa-building',
    component: markRaw(CompanyProfile)
  },
  {
    title: 'My Fleet',
    value: 'my-fleet',
    icon: 'fa-light fa-plane-up',
    component: markRaw(AddAircraft),
    items: aircraftCards.value
  },
  {
    title: 'Address Book',
    value: 'shipping-information',
    icon: 'fa-regular fa-box-taped',
    component: markRaw(ShippingInformation),
    items: shippingAddressesCards.value
  },
  {
    title: 'Shipping Account',
    value: 'shipping-account',
    icon: 'fa-regular fa-box-taped',
    component: markRaw(ShippingAccount),
    items: shippingMethodsCards.value
  },
]).value;

const doRefresh = async (event: CustomEvent) => {
  try {
    await updateAircrafts();
    await updateShippingAddresses();
  } catch (error) {
    console.error('Error refreshing account details:', error);
  } finally {
    event.target.complete();
  }
}

const handleAircraftAdded = () => {
  hasNewAircraft.value = true;
  updateAircrafts();
  updateShippingAddresses();
  updateShippingMethods();
  // setTimeout(() => hasNewAircraft.value = false, 5000);
}

const handleAircraftRemoved = () => {
  hasDeletedAircraft.value = true;
  updateAircrafts();
  setTimeout(() => hasDeletedAircraft.value = false, 5000);
}

const updateAircrafts = async () => {
  const allAircrafts = await aircraftsModel.fetchAll();
  aircraftCards.value = allAircrafts.map(aircraft => aircraftsModel.convertToCard(aircraft));
  segments.find(segment => segment.value === 'my-fleet').items = aircraftCards.value;
}

const updateShippingAddresses = async () => {
  const allShippingAddresses = await shippingAddressesModel.fetchAll();
  shippingAddressesCards.value = allShippingAddresses.map(shippingAddress => shippingAddressesModel.convertToCard(shippingAddress));
  segments.find(segment => segment.value === 'shipping-information').items = shippingAddressesCards.value;
}

const updateShippingMethods = async () => {
  const allShippingMethods = await shippingMethodsModel.fetchAll();
  shippingMethodsCards.value = allShippingMethods.map(shippingAddress => shippingMethodsModel.convertToCard(shippingAddress));
  segments.find(segment => segment.value === 'shipping-account').items = shippingMethodsCards.value;
}

onMounted(() => {
  EventBus.on('aircraftAdded', handleAircraftAdded);
  EventBus.on('aircraftRemoved', handleAircraftRemoved);
  updateAircrafts();
  updateShippingAddresses();
  updateShippingMethods();
});

onBeforeUnmount(() => {
  EventBus.off('aircraftAdded');
  EventBus.off('aircraftRemoved');
});
</script>

<style>

  h1{
    font-size: 1.25rem;
    font-weight: 600;
  }

  h1 + p{
    font-size: 0.875rem;
    color: var(--ion-color-tertiary);
    opacity: 0.6;
  }

  .card-wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px auto;
  }

  ion-modal ion-title{
    padding-inline-start: 12px;
    font-family: var(--base-font);
    font-size: 1.25rem;
    font-weight: 600;
    text-align: left;
  }

</style>