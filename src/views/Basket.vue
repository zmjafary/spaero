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
      <div class="container container--narrow">
        <h1>Basket</h1>
        <p>View the contents of your purchase basket below and confirm you are happy before confirming your order.</p>
      </div>
      <div class="main-content">
        <div class="container container--narrow">
          <HomeTabs :segments="segments" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
  import { chevronDownCircleOutline } from 'ionicons/icons';
  import TopMenuBar from '@/components/TopMenuBar.vue';
  import Button from '@/components/Button.vue';
  import Card from '@/components/Card.vue';
  import CartService from '../services/cartService';
  import { CartItemsModel } from '../Models/CartItemsModel';
  import { EventBus } from '@/eventBus';
  import HomeTabs from '@/components/HomeTabs.vue';
  import BasketPurchases from '@/components/BasketPurchases.vue';
  import BasketRepairs from '@/components/BasketRepairs.vue';


  const cart = ref<any>({
    purchase: null,
    repair: null
  });
  
  const purchaseCartItems = ref({});
  const purchaseCartItemCards = ref([]);

  const repairCartItems = ref({});
  const repairCartItemCards = ref([]);

  const isPurchseBasketEmpty = ref(true);
  const isRepairBasketEmpty = ref(true);

  const doRefresh = async (event: CustomEvent) => {
    try {
      await updateCart();
    } catch (error) {
      console.error('Error refreshing basket:', error);
    } finally {
      event.target.complete();
    }
  };

  const refreshTrigger = ref(0);
  const segments = computed(() => {
    const _ = refreshTrigger.value;
    
    return [
      {
        title: 'Purchases',
        value: 'purchases',
        component: BasketPurchases,
        data: {
          cart: cart.value.purchase,
          isBasketEmpty: isPurchseBasketEmpty.value,
          cartItemCards: purchaseCartItemCards.value,
        }
      },
      {
        title: 'Repairs',
        value: 'repairs',
        component: BasketRepairs,
        data: {
          cart: cart.value.repair,
          isBasketEmpty: isRepairBasketEmpty.value,
          cartItemCards: repairCartItemCards.value,
        }
      },
    ];
  });

  const updateCart = async () => {
    //purchase
    cart.value = await CartService.getCart();
    purchaseCartItems.value = await CartService.getCartItems();
  
    purchaseCartItemCards.value = Object.entries(purchaseCartItems.value.purchase).map(([item_id, item]) => 
      new CartItemsModel().convertToCard(item)
    );
    isPurchseBasketEmpty.value = !cart.value || !Object.keys(purchaseCartItems.value.purchase).length;


    //repair
    cart.value = await CartService.getCart();
    repairCartItems.value = await CartService.getCartItems();
    repairCartItemCards.value = Object.entries(repairCartItems.value.repair).map(([item_id, item]) => 
      new CartItemsModel().convertToRepairCard(item)
    );
    isRepairBasketEmpty.value = !Object.keys(repairCartItems.value.repair).length;

  };

  onMounted(async () =>{
    EventBus.on('purchaseEnquiriesUpdated', async () => {
      await updateCart();
      refreshTrigger.value++;
    });

    await updateCart();
  });

  onBeforeUnmount(() => {
    EventBus.off('purchaseEnquiriesUpdated');
  });
</script>

<style scoped>
  h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  h1 + p {
    font-size: 0.875rem;
    color: var(--ion-color-tertiary);
    opacity: 0.6;
  }
  h2 {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .basket__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .basket__costs ion-row {
    padding: 8px 0;
    border-bottom: 1px dashed rgba(27, 51, 71, 0.1);
    font-size: 0.875rem;
    font-weight: 400;
    color: rgba(27, 51, 71, 0.7);
  }

  .basket__costs ion-row:last-child {
    font-size: 1.0625rem;
    color: rgba(27, 51, 71, 1);
    border-bottom: none;
  }

  .basket__costs ion-row ion-col:last-child {
    text-align: right;
  }

  .empty-basket {
    text-align: center;
    color: var(--ion-color-tertiary);
    padding: 100px 0;
  }

  .empty-basket i {
    font-size: 1.875rem;
  }

  .empty-basket h2 {
    font-weight: 600;
    margin: 8px 0;
    font-size: 1rem;
    line-height: 1.45em;
  }

  .empty-basket p {
    opacity: 0.7;
    font-size: 0.875rem;
  }

  .btn-container {
    padding-top: 20px;
    position: sticky;
    bottom: 20px;
    z-index: 9999;
  }
</style>