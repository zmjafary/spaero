<template>
  <ion-page id="main-content">
    <ActionBarMenu :items="actionBarItems" />
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
      <TabHeader title="Purchases" text="This is your purchase dashboard. From here, you can see your purchase RFQs and orders." />
      <QuickBar :items="quickBarItems" :hasBar="true" />
      <ActionBar :items="actionBarItems" />
      <HomeContent :segments="segments" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import { ref } from 'vue';
import ActionBarMenu from '@/components/ActionBarMenu.vue';
import ActionBar from '@/components/ActionBar.vue';
import TopMenuBar from '@/components/TopMenuBar.vue';
import TabHeader from '@/components/TabHeader.vue';
import QuickBar from '@/components/QuickBar.vue';
import HomeContent from '@/components/HomeContent.vue';
import { ActionBarItem } from '@/types/ActionBarItem';
import { PurchaseRfqModel } from '@/Models/PurchaseRfqModel';
import authService from '../services/authService';
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
  },
  {
    title: 'Active Users',
    number: '-',
    icon: 'fa-light fa-people'
  },
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
  }
]);
const actionBarItems: ActionBarItem[] = [
  {
    title: 'Make a purchase',
    url: '/purchase/create',
    icon: 'fa-regular fa-plus',
  },
  // {
  //   title: 'View RFQs',
  //   url: '/purchase/rfqs',
  //   icon: 'fa-regular fa-list'
  // },
  // {
  //   title: 'More',
  //   url: '#',
  //   icon: 'fa-regular fa-ellipsis',
  //   subItems: [
  //     {
  //       title: 'Invoices',
  //       url: '#',
  //       icon: 'fa-regular fa-file-invoice',
  //       text: 'View list of all purchase/sales invoices'
  //     },
  //     {
  //       title: 'Chat centre',
  //       url: '#',
  //       icon: 'fa-regular fa-messages',
  //       text: 'Chat with our customer service team'
  //     },
  //     {
  //       title: 'Support tickets',
  //       url: '#',
  //       icon: 'fa-regular fa-life-ring',
  //       text: 'Need help? Submit a support ticket'
  //     },
  //   ]
  // }
];

const first_name = ref('-');
const purchaseOrderRfqs = ref([]);
const purchaseOrderRfqsModel = new PurchaseRfqModel();

const purchaseOrders = ref([]);
const purchaseOrdersModel = new OrderModel();

const doRefresh = async (event: CustomEvent) => {
  try {
    await updatePageContent();
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    event.target.complete();
  }
};

const updatePageContent = async () => {
  const profile = await authService.getProfile(true);
  purchaseOrderRfqs.value = await purchaseOrderRfqsModel.fetchAll();
  purchaseOrderRfqs.value = purchaseOrderRfqsModel.convertToCard(purchaseOrderRfqs.value);

  purchaseOrders.value = await purchaseOrdersModel.fetchAll();
  purchaseOrders.value = purchaseOrdersModel.convertToCard(purchaseOrders.value.purchase);

  quickBarItems.value[0].number = purchaseOrderRfqs.value.length;
  quickBarItems.value[1].number = profile.statistics.openPurchaseOrders.length;
  quickBarItems.value[2].number = '$' + profile.statistics.totalRepairOrders + 'k';

  segments.value[0].items = purchaseOrderRfqs;
  segments.value[1].items = purchaseOrders;

  first_name.value = profile.profile.first_name;
}

updatePageContent();
</script>