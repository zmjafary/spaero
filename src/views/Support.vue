<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <h1>Tickets</h1>
        <p>Lectus non varius gravida fermentum volutpat. Vel massa quis phasellus neque donec at.</p>
      </div>
      <QuickBar :items="quickBarItems" />
      <ActionBar :items="actionBarItems" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonBackButton, IonButtons, IonText, IonContent } from '@ionic/vue';
import QuickBar from '@/components/QuickBar.vue';
import ActionBar from '@/components/ActionBar.vue';
import { ActionBarItem } from '@/types/ActionBarItem';
import { QuickItem } from '@/types/QuickItem';

const quickBarItems: QuickItem[] = [
  {
    title: 'Total Tickets',
    number: '5',
    icon: 'fa-light fa-ticket'
  },
  {
    title: 'Pending Tickets',
    number: 2,
    icon: 'fa-light fa-clock'
  },
  {
    title: 'Closed Tickets',
    number: 2,
    icon: 'fa-light fa-circle-xmark'
  }
]

const actionBarItems: ActionBarItem[] = [
  {
    title: 'Create a ticket',
    url: '/purchase/create',
    icon: 'fa-regular fa-plus',
  },
  {
    title: 'View RFQ\s',
    url: '/purchase/rfqs',
    icon: 'fa-regular fa-list'
  },
  {
    title: 'More',
    url: '#',
    icon: 'fa-regular fa-ellipsis',
    subItems: [
      {
        title: 'Invoices',
        url: '#',
        icon: 'fa-regular fa-file-invoice',
        text: 'View list of all purchase/sales invoices'
      },
      {
        title: 'Chat centre',
        url: '#',
        icon: 'fa-regular fa-messages',
        text: 'Chat with our customer service team'
      },
      {
        title: 'Support tickets',
        url: '#',
        icon: 'fa-regular fa-life-ring',
        text: 'Need help? Submit a support ticket'
      },
    ]
  }
]


</script>

<style>

h1{
  font-size: 1.25rem;
  font-weight: 600;
}

h1 + p{
  font-size: 0.875rem;
  color: var(--ion-color-tertiary);
  opacity: 0.6;
}

</style>