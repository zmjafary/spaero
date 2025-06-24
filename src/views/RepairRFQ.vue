<template>
  <ion-page id="main-content">
   <ion-toolbar class="spaero-toolbar safe-space">
     <div class="container">
       <ion-header>
         <ion-buttons slot="start">
           <ion-back-button defaultHref="/purchase/rfqs" text="">
             <i class="fa-solid fa-chevron-left"></i>
           </ion-back-button>
         </ion-buttons>
         <ion-title>Your purchase RFQs</ion-title>
       </ion-header>
     </div>
   </ion-toolbar>
   <ion-content class="spaero-page">
     <div class="container">
      <template v-if="isNewPurchaseRfq">
        <Message title="Your RFQ has been sent" :text="'There are ' + purchaseRfqStats.suppliers + ' available suppliers that match your requested items. ' + purchaseRfqStats.parts_quoted + ' parts have already been quoted.'" type="success" />
        <p>Next, view the list of available suppliers that match your requested item. Items that have been quoted already can be added to your basket straight away.</p>
      </template>
      <HomeTabs :segments="tabSegments" />
     </div>
   </ion-content>
 </ion-page>
</template>

<script setup lang="ts">
import HomeTabs from '@/components/HomeTabs.vue';
import { onMounted, onBeforeUnmount } from 'vue';
import { OrderModel } from '../Models/OrderModel';
import { ref } from "vue";
import { IonToolbar, IonHeader, IonTitle, IonBackButton, IonPage, IonButtons, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { RepairRfqModel } from '../Models/RepairRfqModel';
import { RepairEnquiriesModel } from '../Models/RepairEnquiriesModel';
import Message from '@/components/Message.vue';
import { EventBus } from '@/eventBus';

const router = useRoute();

const orderModel = new OrderModel;

const tabSegments:any = ref([
  {
    title: 'List View',
    value: 'list-view',
    itemTitle: `RFQ Ref - #SRFQ123`,
    items: {},
  }
]);
const isNewPurchaseRfq:any= ref(router.query.isNew ?? false);
const purchaseRfqStats:any = ref({
  'suppliers': 0,
  'parts_quoted': 0
});

const purchaseRfq:any = ref([]);
const purchaseEnquiries:any = ref([]);

const repairRfqModel:any = new RepairRfqModel();
const purchaseEnquiriesModel:any = new RepairEnquiriesModel(router.params.id);

const handleEnquiriesData = (enquiriesData, model) => {
  const enquiries = [];
  for (const [part_number, parts] of Object.entries(enquiriesData)) {
    const card = model.convertToCard(part_number, parts);
    enquiries.push(card);
  }
  return enquiries;
};

const processSuppliers = (enquiriesData:any) => {
  const allEnquiries: any = Object.values(enquiriesData).flat();
  const uniqueCompanyIDs = new Set(allEnquiries.map(item => item.companyID));
  return uniqueCompanyIDs.size;
};

const updatePageContent = async () => {
  console.log('Updating page content');
  try {
    // Fetch all data concurrently
    const [rfqData, enquiriesData] = await Promise.all([
      repairRfqModel.findById(router.params.id),
      purchaseEnquiriesModel.fetchAll()
    ]);

    purchaseRfq.value = rfqData;
    purchaseEnquiries.value = enquiriesData;

    purchaseRfqStats.value.parts_quoted = rfqData.enquires_count;
    purchaseRfqStats.value.suppliers = processSuppliers(enquiriesData);

    // Handle enquiries
    const enquiries = handleEnquiriesData(enquiriesData, purchaseEnquiriesModel);

    tabSegments.value[0].items = enquiries;
    tabSegments.value[0].itemTitle = 'RFQ - #SRFQ' + orderModel.padWithZeroes(purchaseRfq.value.id);

  } catch (error) {
    console.error('Error updating page content:', error);
  }
};

updatePageContent();

const updateCards = async () => {
  const [rfqData, enquiriesData] = await Promise.all([
      repairRfqModel.findById(router.params.id),
      purchaseEnquiriesModel.fetchAll()
    ]);

  purchaseEnquiriesModel.value = new RepairEnquiriesModel(router.params.id);

  const enquiries = handleEnquiriesData(enquiriesData, purchaseEnquiriesModel);

  tabSegments.value[0].items = enquiries;
};

onMounted(() => {
  EventBus.on('purchaseEnquiriesUpdated', updatePageContent);
});

// Cleanup listener when the component is unmounted
onBeforeUnmount(() => {
  delete EventBus['purchaseEnquiriesUpdated'];
});

</script>

<style>
.spaero-toolbar{
 --background: var(--ion-color-primary);
 color: #fff;
}

.spaero-toolbar ion-back-button{
 --color: #fff
}

.spaero-page{

}

 .spaero-page__title{
   font-size: 0.875rem;
   color: var(--ion-color-tertiary);
   opacity: 0.7;
 }

 .spaero-page__controls{
   display: flex;
   flex-direction: row;
   margin: 20px 0;
 }

 .spaero-page__actions{
   margin-left: auto;
   display: flex;
   flex-direction: row;
   gap: 10px
 }
</style>