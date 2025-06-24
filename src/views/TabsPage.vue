<template>
  <ion-page>
    <Menus />
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/home">
          <i class="fa-solid fa-square-poll-vertical"></i>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/purchase">
          <i class="fa-regular fa-tag"></i>
          <ion-label>Purchase</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab4" href="/repair">
          <i class="fa-light fa-hammer"></i>
          <ion-label>Repair</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" @click.prevent="goToBasketTab()">
          <ion-badge v-if="cartCount">{{cartCount}}</ion-badge>
          <i class="fa-light fa-basket-shopping"></i>
          <ion-label>Basket</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet, IonBadge } from '@ionic/vue';
import Menus from '@/components/Menus.vue';
import { ref } from 'vue';
import { CartItemsModel } from '@/Models/CartItemsModel';
import { EventBus } from '@/eventBus';
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartCount = ref(0);

const cartItemsModel = new CartItemsModel();

const updateCartItemCount = async () => {
  const cartItems = await cartItemsModel.fetchAll();
  cartCount.value = Object.keys(cartItems.purchase).length + Object.keys(cartItems.repair).length;
}

updateCartItemCount();

const goToBasketTab = () => {
  router.replace('/basket')
}

onMounted(() => {
  EventBus.on('purchaseEnquiriesUpdated', updateCartItemCount);
});

// Cleanup listener when the component is unmounted
onBeforeUnmount(() => {
  delete EventBus['purchaseEnquiriesUpdated'];
});



</script>

<style scoped>
i{
  font-size: 1.625rem;
}

ion-tabs{
  padding-top: 0;
}

ion-tab-bar{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: none;
  background-color: #fff;
  height: 65px;
}

ion-tab-button{
  background-color: #fff;
  --padding-top: 10px;
  --padding-bottom: 10px;
}



</style>