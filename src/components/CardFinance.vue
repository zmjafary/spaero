<template>
  <ion-card class="spaero-card">
    <ion-card-header class="spaero-card__header">
      <ion-card-title class="spaero-card__title">#SRFQ000053 <span class="spaero-card__warning">Outstanding</span></ion-card-title>
    </ion-card-header>
    <ion-card-content class="spaero-card__content">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label>Invoice Type</ion-label>
            <p>Proforma</p>
          </ion-col>
          <ion-col>
            <ion-label>Transaction Type</ion-label>
            <p>Purchase</p>
          </ion-col>
          <ion-col>
            <ion-label>Invoice Date</ion-label>
            <p>07 May 2024</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label>Due Date</ion-label>
            <p>28 Jul 2024</p>
          </ion-col>
          <ion-col>
            <ion-label>Amount</ion-label>
            <p>$61.20</p>
          </ion-col>
          <ion-col>
            <ion-label>Paid</ion-label>
            <p>$00.00</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
    <ion-footer class="spaero-card__footer">
      <ion-button id="open-finance" color="tertiary" fill="outline" expand="block"><i class="fa-light fa-list"></i>&nbsp;&nbsp;&nbsp;View details</ion-button>
    </ion-footer>
  </ion-card>
  <ion-modal ref="modal" trigger="open-finance" class="spaero-card__modal spaero-card__modal--finance">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button size="large" @click="modalController.dismiss()" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
        </ion-buttons>
        <ion-title class="ion-text-start">Transaction Details</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <span class="spaero-card__warning">Outstanding</span>
      <ion-grid>
        <ion-row>
          <ion-col>Date/Time</ion-col>
          <ion-col>17 July 2024</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Transaction Type</ion-col>
          <ion-col>Purchase - Product</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Order Type</ion-col>
          <ion-col>Outright</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Invoice Type</ion-col>
          <ion-col>Proforma</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Invoice Number</ion-col>
          <ion-col>REPINV000135</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Account Terms</ion-col>
          <ion-col>Proforma</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Due Date</ion-col>
          <ion-col>17 July 2024</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Order Number</ion-col>
          <ion-col>Amount</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Amount</ion-col>
          <ion-col>$20.00</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Received</ion-col>
          <ion-col>$0.00</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Paid</ion-col>
          <ion-col>--</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Date Received/Paid</ion-col>
          <ion-col>--</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-grid>
        <ion-row>
          <ion-col>Amount Outstanding</ion-col>
          <ion-col>$20.00</ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonGrid, IonLabel, IonCol, IonRow, IonFooter, IonButtons, IonModal, IonTitle, IonContent, IonHeader, IonToolbar } from '@ionic/vue';
import { modalController } from '@ionic/vue';
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

  .spaero-card__success, .spaero-card__danger, .spaero-card__info, .spaero-card__warning{
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

  .spaero-card__warning{
    background-color: rgba(247, 152, 36, 0.1);
    color: #F79824;
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

.spaero-card__modal--finance ion-col {
  padding: 5px 0;
  font-size: 0.875rem;
}

.spaero-card__modal--finance ion-content{
  --background: #fff;
}

.spaero-card__modal--finance .spaero-card__warning{
  display: inline-block;
  margin-bottom: 10px;
}

.spaero-card__modal--finance ion-col:first-child{
  opacity: 0.7;
  color: var(--ion-color-tertiary);
} 

.spaero-card__modal--finance ion-col:last-child {
  font-weight: bold;
  text-align: right;
  color: var(--ion-color-tertiary);
}

.spaero-card__modal--finance ion-footer{
  padding: 16px 20px;
  border-top: 1px solid rgba(242, 241, 248, 1);
}


ion-modal ion-title{
  padding-inline-start: 12px;
  font-family: var(--base-font);
  font-size: 1.25rem;
  font-weight: 600;
}

.spaero-card__modal--finance ion-footer ion-col{
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ion-color-tertiary);
}

.spaero-card__modal--finance ion-footer ion-col:first-child{
  opacity: 1;
}

</style>