<template>
  <ion-page id="main-content">
    <ion-content :fullscreen="true">
      <TopMenuBar />
      <div class="container">
        <h1>Change Password</h1>
        <p>Lectus non varius gravida fermentum volutpat. Vel massa quis phasellus neque donec at.</p>
        <form class="new-user-form spaero-form">
          <Input label="Current Password" />
          <Input label="New Password" />
          <Input label="Confirm New Password" />
          <Button btnText="Update Password" color="secondary" :hasGradient="true" />
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import TopMenuBar from '@/components/TopMenuBar.vue';
  import { ref } from 'vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
</script>

<style>

  .new-user-form{
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
  }
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

  ion-modal ion-title{
    padding-inline-start: 12px;
    font-family: var(--base-font);
    font-size: 1.25rem;
    font-weight: 600;
    text-align: left;
  }

</style>