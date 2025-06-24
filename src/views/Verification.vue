<template>
  <ion-page>
    <ion-toolbar class="spaero-toolbar">
      <div class="container">
        <ion-header>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/login" text="">
              <i class="fa-solid fa-chevron-left"></i>
            </ion-back-button>
          </ion-buttons>
        </ion-header>
      </div>
    </ion-toolbar>
    <div class="spaero-verification">
      <h1>Verification Code</h1>
      <p>We sent a code to your email</p>
      <p><span>j********@email.com</span></p>
      <div class="spaero-verification__code-input">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-input :maxlength="1" />
            </ion-col>
            <ion-col>
              <ion-input :maxlength="1" />
            </ion-col>
            <ion-col>
              <ion-input :maxlength="1" />
            </ion-col>
            <ion-col>
              <ion-input :maxlength="1" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <p><span>Didn't receive your code? Re-send in</span> XXXsec...</p>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonInput, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonBackButton, IonButtons, IonPage, } from '@ionic/vue';
</script>

<style scoped>
.spaero-toolbar{
 --background: var(--ion-color-primary);
 color: #fff;
}

.spaero-toolbar ion-back-button{
 --color: #fff
}

.spaero-verification{
  background-color: var(--ion-color-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

  .spaero-verification h1{
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.45em;
    margin-top: auto;
  }

    .spaero-verification h1 + p{
      opacity: 0.7;
    }

  .spaero-verification p{
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
    line-height: 1.42em;
  }

  ion-grid{
    --ion-grid-padding: 0;
  }

  ion-row{
    gap: 12px;
  }

  ion-col{
    --ion-grid-column-padding: 0;
    --ion-grid-columns: 4;
  }

.spaero-verification__code-input{
  max-width: 284px;
  margin: 25px 0;
}

  .spaero-verification__code-input ion-input{
    --background: rgba(255,255,255,0.16);
    border: 1px solid #fff;
    border-radius: 4px;
    font-size: 1.625rem;
    font-weight: 700;
    text-align: center;
    width: 62px;
    height: 61px;
  }

    .spaero-verification__code-input ion-input .native-input{
      caret-color: #fff !important;
    }

    .spaero-verification__code-input ion-input.has-focus{
      border-top-color: rgba(255,255,255,0.16);
      border-left-color: rgba(255,255,255,0.16);
      border-right-color: rgba(255,255,255,0.16);
      caret-color: #fff !important;
    }

    .spaero-verification__code-input + p{
      margin-top: auto;
      margin-bottom: 20px;
    }

      .spaero-verification__code-input + p span{
        opacity: 0.8;
      }
  
</style>