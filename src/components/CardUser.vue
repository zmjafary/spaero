<template>
  <ion-card class="spaero-card">
    <ion-card-header class="spaero-card__header">
      <ion-card-title class="spaero-card__title">Username <span class="spaero-card__success">Active</span></ion-card-title>
    </ion-card-header>
    <!-- <ion-card-header class="spaero-card__header">
      <ion-card-title class="spaero-card__title">Username <span class="spaero-card__danger"><i class="fa-regular fa-circle-exclamation"></i> Inactive</span></ion-card-title>
    </ion-card-header> -->
    <ion-card-content class="spaero-card__content">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label>Email Address</ion-label>
            <p>reborn@service.com</p>
          </ion-col>
          <ion-col>
            <ion-label>Phone Number</ion-label>
            <p>+44 0718273653</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label>Roles</ion-label>
            <p>Distributor User</p>
          </ion-col>
          <ion-col>
            <ion-label>Company Name</ion-label>
            <p>Vendor 2</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
    <ion-footer class="spaero-card__footer">
      <!-- if you need more buttons they should fill space -->
      <ion-button router-link="/user-accounts/1/edit" color="tertiary" fill="outline" expand="block">Edit User</ion-button>
    </ion-footer>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonGrid, IonLabel, IonCol, IonRow, IonFooter } from '@ionic/vue';
</script>

<style>
.spaero-card{
  margin: 0;
  font-family: var(--base-font);
  background-color: #fff;
  max-width: 655px;
  width: 100%;
}

  .spaero-card__header{
    border-bottom: 1px solid rgba(27, 51, 71, 0.1);
    padding: 15px;
  }

    .spaero-card__header-match{
      background-color: #8CACC5;
      padding: 5px 15px;
    }

      .spaero-card__header-match--success{
        background-color: var(--ion-color-success);
      }

      .spaero-card__header-match .spaero-card__title{
        font-weight: 400;
        color: #fff;
        display: flex;
        font-size: 1rem;
      }

        .spaero-card__header-match .spaero-card__title span{
          font-weight: 600;
        }

  .spaero-card__title{
    font-size: 0.9375rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 2em;
  }

  .spaero-card__success, .spaero-card__danger, .spaero-card__info{
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: -0.24px;
    line-height: 1.2em;
    padding: 5px 10px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .spaero-card__success{
    color: rgba(50, 147, 111, 1);
    background-color: rgba(50, 147, 111, 0.1);
  }

  .spaero-card__danger{
    background-color: rgba(237, 30, 36, 0.1);
    color: rgba(237, 30, 36, 1);
  }

  .spaero-card__info{
    background-color:rgba(68, 119, 161, 0.1);
    color: rgba(68, 119, 161, 1);
    padding: 7px 10px;
  }

  .spaero-card__buttons{
    align-items: center;
    gap: 10px;
    display: flex;
  }

    .spaero-card__buttons ion-button, .spaero-card__footer ion-button{
      font-size: 0.8125rem;
      margin: 0;
      --border-radius: var(--radius);
    }

    .spaero-card__buttons .button-outline::part(native){
      border-color: rgba(27, 51, 71, 0.1);
    }

  .spaero-card__footer{
    border-top: 1px solid rgba(27, 51, 71, 0.1);
    display: flex;
    flex-direction: row;
    gap: 18px;
    padding: 15px;
  }

    .spaero-card__footer ion-button{
      width: 100%;
    }

  .spaero-card__content{
    padding: 15px !important;
  }

    .spaero-card__content ion-label{
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.8125rem;
      margin: 0 0 7px;
    }

    .spaero-card__content ion-label + p{
      font-weight: 600;
      color: #000;
      font-size: 0.875rem;
      margin: 0 0 12px;
    }
</style>