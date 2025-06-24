<template>
  <ion-page>
    <header class="login-header login-header__check">
      <!-- <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons> -->
      <img src="../assets/images/icon.svg" class="login-header__logo">
      <h1 class="login-header__title">Check your email</h1>
      <p class="login-header__text"><span>We've sent instructions on how to reset your password to</span> <strong>test@test.com</strong>.</p>
      <Button />
    </header>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonBackButton, IonButtons, IonText } from '@ionic/vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
</script>

<style>
  .login-header__check{
    height: 100%;
    justify-content: center;
  }
</style>