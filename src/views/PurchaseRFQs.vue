<template>
   <ion-page id="main-content">
    <ion-toolbar class="spaero-toolbar safe-space">
      <div class="container">
        <ion-header>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/purchase" text="">
              <i class="fa-solid fa-chevron-left"></i>
            </ion-back-button>
          </ion-buttons>
          <ion-title>Your purchase RFQs</ion-title>
        </ion-header>
      </div>
    </ion-toolbar>
    <ion-content class="spaero-page">
      <div class="container">
        <div class="spaero-page__controls">
          <p class="spaero-page__title">Showing X of X results</p>
          <div class="spaero-page__actions">
            <Filters />
            <Sort />
          </div>
        </div>
        <div class="spaero-page__elements">
          <Card />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import Filters from '@/components/Filters.vue';
import Sort from '@/components/Sort.vue';
import { IonToolbar, IonHeader, IonTitle, IonBackButton, IonPage, IonButtons, IonContent } from '@ionic/vue';
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