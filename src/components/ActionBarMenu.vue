<template>
  <template v-if="items" v-for="(item, index) in items">
    <ion-menu class="action-bar-menu" type="overlay" side="end" content-id="action-content" :menu-id="'btn-' + index" v-if="item.subItems && item.subItems.length">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button :menu-id="'btn-' + index">
                <i class="fa-solid fa-chevron-left"></i>
            </ion-menu-button>
          </ion-buttons>
          <ion-title>{{ item.title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-button fill="clear" size="small" expand="full" :router-link="subItem.url" v-for="subItem in item.subItems">
          <div class="cont">
            <i :class="subItem.icon"></i>
            <div>
              <h2>{{  subItem.title }}</h2>
              <p>{{  subItem.text }}</p>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </ion-button>
      </ion-content>
    </ion-menu>
  </template>
</template>

<script setup lang="ts">
  import { IonButton, IonMenu, IonHeader, IonTitle, IonContent, IonMenuButton, IonButtons, IonToolbar } from '@ionic/vue';
  import { ActionBarItem } from '@/types/ActionBarItem';
  import { PropType } from 'vue';

  defineProps({
    items: {
      type: Array as PropType<ActionBarItem[]>
    }
  });

</script>

<style scoped>

  ion-menu {
    --min-width: 100%;
  }

  @media screen and (min-width: 48em){
    ion-menu {
      --min-width: 350px;
    }
  }

  ion-menu ion-toolbar{
    --background: var(--ion-color-primary);
    --padding-top: 12px;
    --padding-bottom: 12px;
    --padding-start: 20px;
    --padding-end: 20px;
    color: #fff;
  }

  ion-menu ion-menu-button{
    color: #fff;
    font-size: 1.25rem;
  }

  ion-menu ion-content{
    --ion-background-color: #F6F6F6;
  }

  ion-content ion-button{
    --radius: 4px;
    --background: #fff;
    --padding-start: 12px;
    --padding-end: 12px;
    --padding-top: 12px;
    --padding-bottom: 12px;
    border: 1px solid rgba(27, 51, 71, 0.1);
    color: var(--ion-color-primary);
    width: 100%;
    text-align: left;
    margin: 0 0 15px;
  }

    ion-content ion-button::part(native){
      display: block;
    }

    ion-content ion-button div.cont{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      width: 100%;
    }
    
    ion-content ion-button i:first-child{
      font-size: 1.25rem;
    }

    ion-content ion-button i:last-child{
      font-size: 0.75rem;
      margin-left: auto;
    }

    ion-content ion-button h2{
      font-weight: 600;
      font-size: 0.9375rem;
      margin: 0 0 3px;
    }

    ion-content ion-button p{
      color: rgba(27, 51, 71, 0.7);
      font-size: 0.8125rem;
      margin: 0;
    }

</style>