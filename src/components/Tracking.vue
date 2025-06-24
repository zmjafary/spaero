<template>
  <div class="order-details">
    <h2>Track Your Order</h2>
    <!-- <pre>{{data}}</pre> -->
    <div class="order-details__tracking" v-if="data.value.history">
      <!-- TODO: Loop these for each step -->
      <div class="order-details__tracking-step" v-for="history in data.value.history">
        <i class="fa-solid fa-circle"></i>
        <div class="order-details__tracking-step-info">
          <h3>{{ history.status_label }}</h3>
          <p>{{ history.updated_at }}</p><!-- Todo: date / time formatting -->
        </div>
      </div>
    </div>
    <h2>Shipping Details</h2>
    <div class="order-details__block" v-if="data.value.shipping_method">
      <ion-grid>
        <ion-row>
          <ion-col>Shipping Account</ion-col>
          <ion-col>{{ data.value.shipping_method.carrier_name ?? '--' }}</ion-col> <!-- Todo: link to the page -->
        </ion-row>
        <ion-row>
          <ion-col>Ship to Address</ion-col>
          <ion-col>{{ data.value.shipping_address.short_name ?? '--' }}</ion-col> <!-- Todo: link to the page -->
        </ion-row>
      </ion-grid>
    </div>
    <!-- TODO: Tracking button -->
  </div>
</template>

<script setup lang="ts">
    import { IonGrid, IonRow, IonCol } from '@ionic/vue';

    const props = defineProps(['data']);
</script>

<style>
  .order-details__tracking{
    margin: 20px 0;
    width: 100%;
  }

  .order-details__tracking-step{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    min-height: 90px;
    position: relative;
  }

    .order-details__tracking-step i{
      margin: auto 0;
      font-size: 0.5rem;
      color: var(--ion-color-primary);
    }

    .order-details__tracking-step::before, .order-details__tracking-step::after{
      content: '';
      display: block;
      width: 1px;
      height: 35px;
      background-color: var(--ion-color-primary);
      margin: auto 0;
      position: absolute;
      left: 3.5px;
      top: 0;
    }

    .order-details__tracking-step::after{
      top: auto;
      bottom: 0;
    }

  .order-details__tracking-step-info{
    margin: auto 0;
    background-color: var(--ion-color-primary-contrast);
    border-radius: 8px;
    padding: 10px;
  }

    .order-details__tracking-step-info h3{
      font-size: 0.875rem;
      color: var(--ion-color-tertiary);
      font-weight: 600;
      margin: 0 0 5px;
    }

    .order-details__tracking-step-info p{
      font-size: 0.875rem;
      font-weight: 400;
      color: rgba(27, 51, 71, 0.7);
      margin: 0
    }

</style>