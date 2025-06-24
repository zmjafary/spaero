<template>
  <ion-page id="main-content">
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="spaero-page__message spaero-page__message--success">
          <h2><i class="fa-solid fa-circle-check"></i> User successfully created</h2>
        </div>
        <h1>User Accounts</h1>
        <p>Lectus non varius gravida fermentum volutpat. Vel massa quis phasellus neque donec at.</p>
      </div>
      <div class="main-content">
        <div class="container card-wrapper">
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
        </div>
      </div>
      <div class="container btn-container">
        <Button color="secondary" btnText="Add new user" :hasGradient="true" expand="block" url="/user-accounts/create" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CardUser from '@/components/CardUser.vue';
import Button from '@/components/Button.vue';

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