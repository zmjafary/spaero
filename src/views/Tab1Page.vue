<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <TabHeader />
      <QuickBar />
      <HomeContent ref="homeContent" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import TabHeader from '@/components/TabHeader.vue';
import QuickBar from '@/components/QuickBar.vue';
import HomeContent from '@/components/HomeContent.vue';

const homeContent = ref(null);

const doRefresh = async (event: CustomEvent) => {
  try {
    // Assuming HomeContent component has a refresh method
    if (homeContent.value && typeof homeContent.value.refresh === 'function') {
      await homeContent.value.refresh();
    }
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    event.target.complete();
  }
};
</script>
