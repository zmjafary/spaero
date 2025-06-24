<template>
  <ion-header id="top-content" class="top-content">
    <div class="container">
      <ion-toolbar color="primary" class="app-top-bar">
          <!-- If logged in -->
          <ion-buttons slot="end">
            <ion-menu-button menu="notifications">
              <i class="fa-solid fa-bell"></i>
              <!-- if greater than 9 just show circle? -->
              <ion-badge v-if="notifications && notifications.length">{{ notifications.length }}</ion-badge>
            </ion-menu-button>
            <ion-menu-button menu="main-menu">
              <i class="fa-regular fa-bars"></i>              
            </ion-menu-button>
          </ion-buttons>
          <!-- /if logged in -->
          <ion-title class="app-top-bar__title">
            <img src="../assets/images/logo-white.svg">
          </ion-title>
      </ion-toolbar>
    </div>
  </ion-header>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonMenuButton, IonButtons, IonButton, IonLabel, IonList, IonItem, IonFooter, IonBadge, IonRow, IonCol } from '@ionic/vue';
  import { ref } from 'vue';
  import Notification from '@/components/Notification.vue';
  import { NotificationModel } from '@/Models/NotificationModel';

  defineProps({
    name: String,
  });

  const notifications = ref([]);
  const notificationsModel = new NotificationModel;
  

  const updateNotifications = async () => {
    notifications.value = await notificationsModel.fetchAll();
  };

  updateNotifications();
</script>

<style>

.header-ios ion-toolbar:last-of-type{
  --border-width: 0;
}

.top-content{
  background-color: var(--ion-color-primary);
}

  .top-content .container{
    padding: 0;
  }

.app-top-bar{
  padding: 12px 20px;
}

  @media screen and (min-width: 64em){
    .app-top-bar{
      padding-top: 12px !important;
    }
  }

  .app-top-bar__title{
    text-align: left;
    padding-left: 0;
  }

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
    }

    ion-menu ion-toolbar ion-title{
      padding-inline-start: 20px;
      padding-inline-end: 20px;
      text-align: left;
    }

    ion-menu ion-content{
      --ion-background-color: #fff;
    }

    ion-menu ion-label p{
      font-family: var(--base-font);
      font-size: 0.8125rem;
      font-weight: 400;
      color: var(--ion-color-tertiary);
      margin-top: 8px;
      margin-bottom: 10px !important;
    }

    ion-menu ion-item{
      --min-height: 30px;
      font-weight: 600;
      font-size: 0.875rem;
      font-family: var(--base-font);
      margin-bottom: 10px;
    }

      ion-menu ion-item a{
        text-decoration: none;
        color: var(--ion-color-tertiary);
        font-size: 0.875rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }

        ion-menu ion-item a i{
          font-size: 1.25rem;
          width: 28px;
        }

    ion-menu ion-footer{
      padding: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 15px 20px;
    }

    ion-menu ion-footer ion-button.ion-color-tertiary{
      --padding-top: 3px;
      --padding-bottom: 3px;
      --padding-start: 20px;
      --padding-end: 20px; 
      margin: 0;
      font-size:1.25rem;
      height: 36px;
    }

    ion-menu ion-footer .button-block{
      width: 100% !important;
      font-size: 1rem !important;
      font-weight: 400;
    }

    ion-menu ion-footer ul{
      list-style: none;
      margin: 0 auto;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.8125rem;
      font-weight: 600;
      gap: 10px;
    }

      ion-menu ion-footer ul li:last-child{
        display: flex;
        flex-direction: row;
        gap: 10px;
      }

        ion-menu ion-footer ul li:last-child::before{
          content: '•';
          display: block;
          color: var(--ion-color-tertiary);
          font-size: 0.6875rem;
          margin: auto;
        }

      ion-menu ion-footer ul a{
        color: var(--ion-color-tertiary);
        text-decoration: none;
        opacity: 0.8;
      }

  ion-buttons{
    gap: 10px;
  }

  ion-menu-button{
    font-size: 0.9375rem;
    padding: 0px 4px;
    border-radius: 6px;
    line-height: 1.3em;
    border: 2px solid #fff;
    position: relative;
    overflow: visible;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

    ion-menu-button::part(native) {
      overflow: visible !important;
  }

    ion-menu-button ion-badge{
      background-color: var(--ion-color-primary-contrast);
      color: var(--ion-color-primary);
      position: absolute;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      text-align: center;
      /* font-size: 1.125rem; */
      font-weight: 600;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      top: -5px;
      right: -17px;
      z-index: 9999;
    }

  ion-item{
    border: none;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  ion-item::part(native){
    --inner-padding-end: 0;
    --inner-border-width: 0;
    margin: 0;
    padding: 0;
    border: none;
  }
</style>
