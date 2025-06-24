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
import { OrderModel } from '../Models/OrderModel';
import { onMounted, onBeforeUnmount } from 'vue';
import { ref } from "vue";
import { IonToolbar, IonHeader, IonTitle, IonBackButton, IonPage, IonButtons, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { PurchaseRfqModel } from '../Models/PurchaseRfqModel';
import { PurchaseEnquiriesModel } from '../Models/PurchaseEnquiriesModel';
import Message from '@/components/Message.vue';
import { EventBus } from '@/eventBus';

const router = useRoute();

const orderModel = new OrderModel;

const tabSegments:any = ref([
  {
    title: 'List View',
    value: 'list-view',
    itemTitle: `RFQ Ref - #SRFQ`,
    items: {},
  },
  {
    title: 'Best Matched',
    value: 'best-match',
    itemTitle: `RFQ Ref - #SRFQ`,
    items: [],
    help: {
      title: 'What is best matched?',
      text: 'Our best match insights orders inventory based on how well they match your criteria.',
      readMore: {
        title: 'What is best matched?',
        text: '<p>To accelerate your procurement process and minimise the hassle of RFQs, our best match insights automatically source inventory that aligns with your specific requirements.</p><p>By evaluating a series of criteria, our algorithm identifies the most suitable options and preselects the best offer for each item, ensuring you receive the optimal match for your needs.</p><table border="1" cellpadding="10" cellspacing="0"><tbody><tr><td>Category</td><td>3</td><td>2</td><td>1</td></tr><tr><td>Price</td><td>Low</td><td>Medium</td><td>High</td></tr><tr><td>Cert Date</td><td>Newest</td><td>Newest to 3 yrs old</td><td>Over 3 yrs old</td></tr><tr><td>Warranty</td><td>9+</td><td>3-8</td><td>0-2</td></tr><tr><td>Lead time</td><td>0</td><td>1-6</td><td>7+</td></tr><tr><td>Condition</td><td>NS, FN</td><td>REP, MOD, OHC</td><td>SVC</td></tr><tr><td>Location</td><td>Same country</td><td>Same region</td><td>Part exists</td></tr></tbody></table>',
      }
    }
  }
]);
const isNewPurchaseRfq:any= ref(router.query.isNew ?? false);
const purchaseRfqStats:any = ref({
  'suppliers': 0,
  'parts_quoted': 0
});

const purchaseRfq:any = ref([]);
const purchaseEnquiries:any = ref([]);
const purchaseEnquiriesBestMatch:any = ref([]);

const purchaseRfqModel:any = new PurchaseRfqModel();
const purchaseEnquiriesModel:any = new PurchaseEnquiriesModel(router.params.id);
const purchaseEnquiriesModelBestMatch:any = new PurchaseEnquiriesModel(router.params.id, true);

const handleEnquiriesData = (enquiriesData, model, type) => {
  const enquiries = [];
  for (const [part_number, parts] of Object.entries(enquiriesData)) {
    const card = type === 'best-match' 
      ? model.convertToCard(part_number, parts, true)
      : model.convertToCard(part_number, parts);
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
  // try {
    // Fetch all data concurrently
    const [rfqData, enquiriesData, enquiriesBestMatchData] = await Promise.all([
      purchaseRfqModel.findById(router.params.id),
      purchaseEnquiriesModel.fetchAll(),
      purchaseEnquiriesModelBestMatch.fetchAll()
    ]);

    purchaseRfq.value = rfqData;
    purchaseEnquiries.value = enquiriesData;
    purchaseEnquiriesBestMatch.value = enquiriesBestMatchData;

    purchaseRfqStats.value.parts_quoted = rfqData.enquires_count;
    purchaseRfqStats.value.suppliers = processSuppliers(enquiriesData);

    // Handle both enquiries and best match enquiries
    const enquiries = handleEnquiriesData(enquiriesData, purchaseEnquiriesModel, 'list');
    const enquiriesBestMatch = handleEnquiriesData(enquiriesBestMatchData, purchaseEnquiriesModelBestMatch, 'best-match');

    tabSegments.value[0].items = enquiries;
    tabSegments.value[1].items = enquiriesBestMatch;

    tabSegments.value[0].itemTitle = 'RFQ - #SRFQ' + orderModel.padWithZeroes(purchaseRfq.value.id);
    tabSegments.value[1].itemTitle = 'RFQ - #SRFQ' + orderModel.padWithZeroes(purchaseRfq.value.id);

  // } catch (error) {
  //   console.error('Error updating page content:', error);
  // }
};

updatePageContent();

const updateCards = async () => {
  const [rfqData, enquiriesData, enquiriesBestMatchData] = await Promise.all([
      purchaseRfqModel.findById(router.params.id),
      purchaseEnquiriesModel.fetchAll(),
      purchaseEnquiriesModelBestMatch.fetchAll()
    ]);


  purchaseEnquiriesModel.value = new PurchaseEnquiriesModel(router.params.id);
  purchaseEnquiriesModelBestMatch.value = new PurchaseEnquiriesModel(router.params.id, true);

  const enquiries = handleEnquiriesData(enquiriesData, purchaseEnquiriesModel, 'list');
  const enquiriesBestMatch = handleEnquiriesData(enquiriesBestMatchData, purchaseEnquiriesModelBestMatch, 'best-match');

  tabSegments.value[0].items = enquiries;
  tabSegments.value[1].items = enquiriesBestMatch;
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