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
      <TabHeader title="Repair" text="This is your repair dashboard. From here you can see your repair RFQ's and orders." />
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
import { RepairRfqModel } from '@/Models/RepairRfqModel';
import authService from '../services/authService';
import { OrderModel } from '@/Models/OrderModel';

const quickBarItems = ref([
  {
    title: 'Open Repair RFQ\'s',
    number: 0,
    icon: 'fa-light fa-file-invoice-dollar'
  },
  {
    title: 'Open Repair Orders',
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
    title: 'Open Repair RFQ\'s',
    value: "open-rfqs",
    icon: 'fa-regular fa-tag',
    items: []
  },
  {
    title: 'Action Required',
    value: 'action-required',
    icon: 'fa-light fa-circle-exclamation',
    items: []
  },
  {
    title: 'Open Repair Orders',
    value: 'open-repair-orders',
    icon: 'fa-light fa-cart-plus',
    items: []
  }
]);
const actionBarItems: ActionBarItem[] = [
  {
    title: 'Start a repair',
    url: '/repair/create',
    icon: 'fa-regular fa-plus',
  },
  // {
  //   title: 'View RFQs',
  //   url: '/repair/rfqs',
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

const repairOrderRfqs = ref([]);
const repairOrderActionRequired = ref([]);
const repairOrderAll = ref([]);
const repairOrderRfqsModel = new RepairRfqModel();

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
  repairOrderRfqs.value = await repairOrderRfqsModel.fetchAll();
  repairOrderRfqs.value = repairOrderRfqsModel.convertToCard(repairOrderRfqs.value);

  purchaseOrders.value = await purchaseOrdersModel.fetchAll();
  purchaseOrders.value = purchaseOrdersModel.convertToCard(purchaseOrders.value);

  quickBarItems.value[0].number = repairOrderRfqs.value.length;
  quickBarItems.value[1].number = profile.statistics.openPurchaseOrders.length;
  quickBarItems.value[2].number = '$' + profile.statistics.totalRepairOrders + 'k';

  let purchaseOrdersData = await purchaseOrdersModel.fetchAll();
  repairOrderActionRequired.value = purchaseOrdersModel.convertToCard(purchaseOrdersData.repair, [3,4,10,11,13], 'RO');
  repairOrderAll.value = purchaseOrdersModel.convertToCard(purchaseOrdersData.repair, [], 'RO');

  segments.value[0].items = repairOrderRfqs;
  segments.value[1].items = repairOrderActionRequired;
  segments.value[1].title = 'Action Required (' + repairOrderActionRequired.value.length + ')';
  segments.value[2].items = repairOrderAll;
}

updatePageContent();
</script>