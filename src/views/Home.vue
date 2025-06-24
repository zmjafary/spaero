<template>
  <ion-page>
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
      <TabHeader :title="'Hello ' + first_name" text="This is your dashboard. From here you can see your outstanding orders and repairs." />
      <QuickBar :items="quickBarItems" :hasBar="true" />
      <HomeContent :segments="segments" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import TabHeader from '@/components/TabHeader.vue';
import QuickBar from '@/components/QuickBar.vue';
import HomeContent from '@/components/HomeContent.vue';
import { QuickItem } from '@/types/QuickItem';
import { Segment } from '@/types/Segment';
import authService from'../services/authService';
import {PurchaseRfqModel} from '../Models/PurchaseRfqModel';
import { ref, onMounted } from 'vue';
import { QuickBarItem } from '@/Models/Interfaces';
import TopMenuBar from '@/components/TopMenuBar.vue';
import { OrderModel } from '@/Models/OrderModel';


const quickBarItems = ref([
  {
    title: 'Open Purchase RFQ\'s',
    number: 0,
    icon: 'fa-light fa-file-invoice-dollar'
  },
  {
    title: 'Open Purchase Orders',
    number: 0,
    icon: 'fa-light fa-box-open'
  },
  {
    title: 'Pending Balances',
    label: 'Purchase',
    number: '$0',
  }
]);
const segments: any = ref([
  {
    title: 'Open Purchase RFQ\'s',
    value: "open-rfqs",
    icon: 'fa-regular fa-tag',
    items: []
  },
  {
    title: 'Open Purchase Orders',
    value: 'open-pos',
    icon: 'fa-regular fa-basket-shopping',
    items: []
  },
  {
    title: 'Open Repair Orders',
    value: 'open-repairs',
    icon: 'fa-regular fa-hammer',
    items: []
  }
]);
const first_name = ref('-');
const purchaseOrderRfqs = ref([]);
const purchaseOrderRfqsModel = new PurchaseRfqModel();

const purchaseOrders = ref([]);
const repairOrders = ref([]);
const purchaseOrdersModel = new OrderModel();

const doRefresh = async (event: CustomEvent) => {
  try {
    await updatePageContent();
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    // Cast the event target to any to avoid TypeScript error
    (event.target as any).complete();
  }
};

const updatePageContent = async () => {
  try {
    const profile = await authService.getProfile(true);
    purchaseOrderRfqs.value = await purchaseOrderRfqsModel.fetchAll();
    purchaseOrderRfqs.value = purchaseOrderRfqsModel.convertToCard(purchaseOrderRfqs.value);

    // Cast the result to any to avoid TypeScript errors
    let purchaseOrdersData: any = await purchaseOrdersModel.fetchAll();
    purchaseOrders.value = purchaseOrdersModel.convertToCard(purchaseOrdersData.purchase || []);
    repairOrders.value = purchaseOrdersModel.convertToCard(purchaseOrdersData.repair || []);
    console.log(profile);

    quickBarItems.value[0].number = purchaseOrderRfqs.value.length;
    quickBarItems.value[1].number = profile.statistics.openPurchaseOrders?.length || 0;
    console.log(profile.statistics);
    
    const pEscrow = parseInt(profile.statistics.p_escrowBalance || '0');
    const rEscrow = parseInt(profile.statistics.r_escrowBalance || '0');
    quickBarItems.value[2].number = '$' + ((pEscrow + rEscrow) / 1000).toFixed(1) + 'k';

    segments.value[0].items = purchaseOrderRfqs;
    segments.value[1].items = purchaseOrders;
    segments.value[2].items = repairOrders;

    first_name.value = profile.profile.first_name || '-';
  } catch (error) {
    console.error('Error updating page content:', error);
  }
}

// Initial load
updatePageContent();

// Add Ionic lifecycle hooks
const ionViewDidEnter = () => {
  console.log('Home view entered - refreshing data');
  updatePageContent();
};

// Register the lifecycle hook
onMounted(() => {
  const page = document.querySelector('ion-page');
  if (page) {
    page.addEventListener('ionViewDidEnter', ionViewDidEnter);
  }
  
  // Add event listener for app resume
  document.addEventListener('resume', () => {
    console.log('App resumed - refreshing data');
    updatePageContent();
  });
  
  // Clean up event listeners when component is unmounted
  return () => {
    if (page) {
      page.removeEventListener('ionViewDidEnter', ionViewDidEnter);
    }
    document.removeEventListener('resume', updatePageContent);
  };
});

</script>
