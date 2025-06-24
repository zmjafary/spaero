<template>
  <ion-page id="main-content">
    <ion-toolbar class="spaero-toolbar safe-space">
      <div class="container">
        <ion-header>
          <ion-buttons slot="start">
            <ion-back-button text="" default-href="/">
              <i class="fa-solid fa-chevron-left"></i>
            </ion-back-button>
          </ion-buttons>
          <ion-title>Order Details</ion-title>
        </ion-header>
      </div>
    </ion-toolbar>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
        :pulling-icon="chevronDownCircleOutline"
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
        refreshing-text="Refreshing..."></ion-refresher-content>
      </ion-refresher>
      <HomeContent :segments="segments" />
      <ion-modal ref="modal" :is-open="isNew" class="new-order-modal">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button size="large" @click="closeModal" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <i class="fa-light fa-circle-check"></i>
          <h2>Your order has been received</h2>
          <p>Your order has been received & will be processed shortly. Click continue to see your tracking information</p>
          <!-- BUTTON -->
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import HomeContent from '@/components/HomeContent.vue';
  import OrderDetails from '@/components/OrderDetails.vue';
  import RepairOrderDetails from '@/components/RepairOrderDetails.vue';
  import TopMenuBar from '@/components/TopMenuBar.vue';
  import Tracking from '@/components/Tracking.vue';
  import { IonPage, modalController, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
  import { OrderModel } from '@/Models/OrderModel';
  import { RepairOrderModel } from '@/Models/RepairOrderModel';
  import { onIonViewWillEnter } from '@ionic/vue';
  import { chevronDownCircleOutline } from 'ionicons/icons';
  import { IonTitle, IonBackButton  } from '@ionic/vue';

  const route = useRoute();
  const isNew = ref(false);

  if(route.query.isNew){
    isNew.value = true;
  }

  function closeModal() {
    modalController.dismiss();
  }

  const orderDetails = ref({});
  const orderDetailsModel = new OrderModel;
  const repairOrderDetailsModel = new RepairOrderModel;

  const order_type = ref('purchase')

  const segments = computed(() => [
    {
      title: order_type.value === 'repair' ? 'Repair Order Details' : 'Order Details',
      value: 'order-details',
      component: order_type.value == 'repair' ? RepairOrderDetails : OrderDetails,
      data: orderDetails
    },
    {
      title: 'Tracking',
      value: 'tracking',
      component: Tracking,
      data: orderDetails
    },
  ]);

  const updatePageContent = async () => {
    if(route.query.order_type === 'repair'){
      orderDetails.value = await repairOrderDetailsModel.findById(route.params.id, 'purchase');
    } else {
      orderDetails.value = await orderDetailsModel.findById(route.params.id, 'purchase');
    }

    order_type.value = route.query.order_type === 'repair' ? 'repair' : 'purchase';
  };

    // Function to refresh the order data
  const doRefresh = async (event: CustomEvent) => {
    try {
      await refreshOrderData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      event.target.complete();
    }
  };
  const refreshOrderData = async () => {
    await updatePageContent();
  };

  // Use Ionic's lifecycle event
  onIonViewWillEnter(() => {
    refreshOrderData();
  });

  updatePageContent();
</script>

<style>
 
  .new-order-modal{
    text-align: center;
 
  }
 
    .new-order-modal ion-content i{
      font-size: 3.125rem;
      color: rgba(68, 119, 161, 1);
      margin-bottom: 10px;
    }
 
    .new-order-modal h2{
      font-size: 1.25rem;
      line-height: 1.5em;
    }
 
    .new-order-modal p{
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5em;
      color: rgba(27, 51, 71, 0.6);
    }
 
</style>