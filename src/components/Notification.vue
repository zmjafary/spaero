<template>
  <ion-button router-link="/" fill="clear" class="notification">
    <div class="notification__message">
      <i class="fa-regular fa-envelope"></i>
      <p>{{ notification.noti_content }}</p>
    </div>
    <div class="notification__time">
      <span>{{ notification.created_at }}</span>
      <i class="fa-solid fa-circle"></i>
    </div>
  </ion-button>
</template>

<script setup lang="ts">
  import { IonButton } from '@ionic/vue';
  import { defineComponent } from 'vue';

  const props = defineProps(['notification']);
</script>

<style scoped>
  .notification{
    border-bottom: 1px solid rgba(0,0,0, 0.07);
    margin: 0 -20px 7px;
  }

    .notification__message{
      display: flex;
      flex-direction: row;
      gap: 10px;
    }

    .notification i{
      border: 1px solid rgba(0,0,0, 0.16);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .notification__message p{
      font-size: 0.875rem;
      text-align: left;
      color: var(--ion-color-tertiary);
      width: 100%;
      max-width: 225px;
      margin: auto 0;
      flex-shrink: 1;
      padding: 4px 0;
    }

    .notification__time{
      font-size: 0.8125rem;
      color: var(--ion-color-tertiary);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 4px;
      align-self: flex-start;
      margin: 0;
      gap: 7px;
    }

      .notification__time span{
        opacity: 0.5;
      }

      .notification__time i{
        color: var(--ion-color-primary);
        font-size: 8px;
        padding: 0;
        margin: 0;
        border: none;
        width: auto;
        height: auto;
      }
</style>