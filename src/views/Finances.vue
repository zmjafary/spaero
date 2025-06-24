<template>
  <ion-page id="main-content">
    <TopMenuBar />
    <ion-content :fullscreen="true">
      <div class="container">
        <h1>Finances</h1>
        <p>Lectus non varius gravida fermentum volutpat. Vel massa quis phasellus neque donec at.</p>
      </div>
      <QuickBar :items="quickBarItems" />
      <HomeContent :segments="segments" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import TopMenuBar from '@/components/TopMenuBar.vue';
import QuickBar from '@/components/QuickBar.vue';
import HomeContent from '@/components/HomeContent.vue';
import { QuickItem } from '@/types/QuickItem';
import { Segment } from '@/types/Segment';

const quickBarItems: QuickItem[] = [
  {
    title: 'Total Owed to Spaero',
    number: '$400.16',
    icon: 'fa-light fa-coins'
  },
  {
    title: 'Total Owed to You',
    number: 0,
    icon: 'fa-light fa-coins'
  },
  {
    title: 'Credit',
    label: 'Purchase',
    number: '$6.2k',
  },
  {
    title: 'Outstanding Invoices',
    number: 2,
    icon: 'fa-regular fa-file-invoice'
  },
]

const segments: Segment[] = [
  {
    title: 'All Transactions',
    value: 'all-transactions'
  },
  {
    title: 'Invoices',
    value: 'invoices'
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

  .card-wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px auto;
  }

  .btn-container{
    padding-top: 20px;
    position: sticky;
    bottom: 20px;
  }

</style>