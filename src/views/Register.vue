<template>
  <ion-page>
    <div class="login-form">
      <h1 class="login-form__title">Login</h1>
      <p>Enter your email and password to log in</p>
      <form class="login-form__form">
        <ion-input placeholder="Email address" type="email" aria-label="Email address"></ion-input>
        <ion-input placeholder="Password" type="password" aria-label="Password"></ion-input>
        <p class="ios-text-right"><a href="/forgot-password">Forgot your password?</a></p>
        <ion-button expand="block">Login</ion-button>
        <p>Don't have an account? <a href="/sign-up">Sign up to register your interest</a></p>
      </form>
    </div>
    <ion-footer color="primary">
      2024 &copy; spaero.co.uk
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonBadge } from '@ionic/vue';
</script>

<style>

/* .login-form{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px 20px;
  color: var(--ion-color-dark);
}

  .login-form__form{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

@media screen and (min-width: 48em){
  .login-form{
    width: 100%;
    max-width: 28em;
    background-color: var(--ion-color-medium-contrast);
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0px -2px 50px 0px rgba(0, 0, 0, 0.26);
    padding: 20px;
  }

  .login-form__title{
    margin: 0 0 8px;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .login-form__text{
    font-size: 0.875rem;
    font-weight: 400;
  }
} */

</style>
