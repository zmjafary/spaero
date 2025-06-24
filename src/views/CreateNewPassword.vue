<template>
  <ion-page>
    <header class="login-header">
      <img src="../assets/images/icon.svg" class="login-header__logo">
      <h1 class="login-header__title">Create new password</h1>
      <p class="login-header__text"><span>Please enter a new password. Ensure your new passwrod is different from the previous one.</span></p>
    </header>
    <div class="login-form">
      <form class="login-form__form">
        <Input />
        <Input />
        <!-- <ion-input placeholder="Email address" type="email" aria-label="Email address"></ion-input> -->
        <Button />
      </form>
    </div>
    <footer class="login-footer">
      <p>2024 &copy; spaero.co.uk</p> 
    </footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonText } from '@ionic/vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
</script>
