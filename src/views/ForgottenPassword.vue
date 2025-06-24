<template>
  <ion-page>
    <header class="login-header">
      <!-- <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons> -->
      <img src="../assets/images/icon.svg" class="login-header__logo">
      <h1 class="login-header__title">Forgot your password</h1>
      <p class="login-header__text">Enter your email address and we'll send you an email with instruction on how to reset your password.</p>
    </header>
    <div class="login-form">
      <form class="login-form__form">
        <Input />
        <Button />
        <ion-text color="secondary">
          <p class="login-form__text"><a href="/login">Back to login</a></p>
        </ion-text>
      </form>
    </div>
    <footer class="login-footer">
      <p>2024 &copy; spaero.co.uk</p> 
    </footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonBackButton, IonButtons, IonText } from '@ionic/vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
</script>