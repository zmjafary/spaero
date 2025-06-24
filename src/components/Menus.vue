<template>
  <div>
    <ion-menu type="overlay" side="end" contentId="top-content" menu-id="main-menu">
      <ion-header>
        <ion-toolbar>
          <ion-title><img src="../assets/images/logo-white.svg"></ion-title>
          <ion-buttons slot="end">
              <ion-menu-button menu="main-menu" color="light" fill="outline">
                <i class="fa-solid fa-xmark"></i>             
              </ion-menu-button>
            </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-label><p>Main Menu</p></ion-label>
        <ion-list>
          <ion-item>
            <router-link to="/finances">
              <i class="fa-regular fa-coins"></i> Finance
            </router-link>
          </ion-item>
        </ion-list>
        <ion-label><p>Support</p></ion-label>
        <ion-list>
          <ion-item>
            <router-link to="/">
              <i class="fa-regular fa-files"></i> Resources
            </router-link>
          </ion-item>
        </ion-list>
        <ion-label><p>Account and security</p></ion-label>
        <ion-list>
          <ion-item>
            <router-link to="/account-details">
              <i class="fa-regular fa-gear"></i> Account details
            </router-link>
          </ion-item>
          <ion-item>
            <router-link to="/account-details/change-password">
              <i class="fa-regular fa-lock"></i> Change password
            </router-link>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-button fill="outline" color="tertiary" size="small" expand="block" router-link="/logout" class="button-block">Log out</ion-button>
        <ion-button fill="outline" color="tertiary" size="small"><i class="fa-brands fa-facebook"></i></ion-button>
        <ion-button fill="outline" color="tertiary" size="small"><i class="fa-brands fa-linkedin"></i></ion-button>
        <ion-button fill="outline" color="tertiary" size="small"><i class="fa-brands fa-x-twitter"></i></ion-button>
        <ion-button fill="outline" color="tertiary" size="small"><i class="fa-brands fa-youtube"></i></ion-button>
        <ul>
          <li><router-link to="/">Terms of use</router-link></li>
          <li><router-link to="/">Privacy policy</router-link></li>
        </ul>
      </ion-footer>
    </ion-menu>
    <ion-menu type="overlay" side="end" contentId="top-content" menu-id="notifications">
      <ion-header>
        <ion-toolbar>
          <ion-title><img src="../assets/images/logo-white.svg"></ion-title>
          <ion-buttons slot="end">
              <ion-menu-button menu="notifications" color="light">
                <i class="fa-solid fa-xmark"></i>
              </ion-menu-button>
            </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <template v-if="notifications.length">
          <ion-label><p>New</p></ion-label>
          <Notification v-for="notification in notifications" :notification="notification" />
          
        </template>
        <template v-else>
          <div class="empty-basket"> 
            <i class="fa-light fa-bell"></i>
            <h2>There are no notifications</h2>
          </div>
        </template>
      </ion-content>
    </ion-menu>
  </div>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonMenuButton, IonButtons, IonButton, IonLabel, IonList, IonItem, IonFooter, IonBadge, IonRow, IonCol} from '@ionic/vue';
  import { ref } from 'vue';
  import Notification from '@/components/Notification.vue';
  import { NotificationModel } from '@/Models/NotificationModel';

  const notifications = ref([]);
  const notificationsModel = new NotificationModel;
  

  const updateNotifications = async () => {
    notifications.value = await notificationsModel.fetchAll();
  };

  updateNotifications();
</script>

<style scoped>
  .empty-basket {
    text-align: center;
    color: var(--ion-color-tertiary);
    padding: 20px 0;
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
</style>