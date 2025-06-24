<template>
  <div class="empty-basket" v-if="data.isBasketEmpty"> 
    <i class="fa-light fa-cart-circle-xmark"></i>
    <h2>Your purchase basket is empty</h2>
  </div>
  <!-- Basket items and total cost -->
  <template v-else>
    <h2>Your order</h2>
    <div class="basket__items">
      <Card v-for="item in data.cartItemCards" :item="item" />
    </div>

    <ion-grid class="basket__costs">
      <ion-row>
        <ion-col>Cost to date</ion-col>
        <ion-col>${{ data.cart && data.cart.totals ? data.cart.totals.items_total : '-' }}</ion-col>
      </ion-row>
      <!-- <ion-row>
        <ion-col>Service fee</ion-col>
        <ion-col>${{ data.cart && data.cart.service ? data.cart.service : '-' }}</ion-col>
      </ion-row> -->
      <ion-row>
        <ion-col>AOG fee</ion-col>
        <ion-col>${{ data.cart && data.cart.totals ? data.cart.totals.aog_fee : '-' }}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>VAT Charge</ion-col>
        <ion-col>${{ data.cart && data.cart.totals ? data.cart.totals.vat : '-' }}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>Sub Total</ion-col>
        <ion-col>${{ data.cart && data.cart.totals ? data.cart.totals.total : '-' }}</ion-col>
      </ion-row>
    </ion-grid>

    <div class="btn-container">
      <Button btnText="Continue" router-link="/basket/confirm/purchase" :hasGradient="true" color="secondary" btnFill="solid" expand="block" />
    </div>
  </template>
</template>

<script lang="ts" setup>
  import Card from '@/components/Card.vue';
  import Button from './Button.vue';
  import { IonCol, IonRow, IonGrid } from '@ionic/vue';

  const props = defineProps([
    'data'
  ]);

</script>

<style>
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
    width: 100%;
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