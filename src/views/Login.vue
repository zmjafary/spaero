<template>
  <ion-page>
    <ion-content>
      <header class="login-header top-content">
        <img src="../assets/images/icon.svg" class="login-header__logo">
        <h1 class="login-header__title">Sign in to your account</h1>
        <p class="login-header__text"><span>Enter your email and password to login.</span></p>
      </header>
      <div class="login-form">
        <span class="login-form__form">
          <Message v-if="errorMessage" type="error" title="There was an error logging in" :text="errorMessage"/>
          <!-- <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> -->
          <Input placeholderText="Email address" label="Email address" @input="email=$event.target.value" type="email" />
          <Input placeholderText="Password" label="Password" @input="password=$event.target.value" type="password" />
          <ion-select label="API Address" v-model="selectedApiAddress" @ionChange="handleApiAddressChange">
            <ion-select-option value="https://staging.spaero.co.uk/api">Spaero Staging</ion-select-option>
            <ion-select-option value="https://spaero-cors.containers.defaultsettings.co.uk/api">Development Staging</ion-select-option>
            <ion-select-option value="http://localhost:8010/proxy/api">Development Local</ion-select-option>
          </ion-select>
          <p class="login-form__text login-form__forgot"><a href="/forgot-password">Forgot your password?</a></p>
          <Button btnText="Log In" :has-gradient="true" color="secondary" :callback="login" />
          <ion-text color="secondary">
            <p class="login-form__text">Don't have an account?<br><a id="open-modal" expand="block">Sign up to register your interest</a></p>
          </ion-text>
        </span>
      </div>
      <footer class="login-footer">
        <p>2025 &copy; spaero.co.uk</p> 
      </footer>
    </ion-content>
    <ion-modal class="login-form__modal" ref="modal" trigger="open-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button size="large" @click="modalController.dismiss()" color="tertiary" fill="clear"><i class="fa-solid fa-xmark"></i></ion-button>
          </ion-buttons>
          <ion-title class="ion-text-start">Register Your Interest</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p class="login-form__modal-text">Fill out the form below with your details and once we receive your information, a member of our team wil get in touch with your shortly.</p>
        <form class="login-form__form login-form__form--modal">
          <div class="input-row">
            <Input label="First name" placeholder="Enter your first name" />
            <Input label="Last name" placeholder="Enter your last name" />
          </div>
          <Input label="Email address" placeholder="Enter your email address" />
          <Input label="Phone number" placeholder="Enter your phone number" />
          <Input label="Company name" placeholder="Enter your company name" />
          <!-- <Select label="Which type of company best describes you?" v-model="" /> -->
          <div>

          </div>
          <div>
            <!-- <Checkbox /> -->
          </div>
          <!-- <Button /> -->
        </form>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonText, IonSelect, IonModal, modalController, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/vue';
import { onMounted } from 'vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import { OverlayEventDetail } from '@ionic/core/components';
import authService from '@/services/authService';
import {useRouter} from 'vue-router';
import apiClient, { setApiAddress } from '@/api';
import { ref } from 'vue';
import Message from '@/components/Message.vue';

  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const errorMessage = ref('');

  const login = async () => {
  errorMessage.value = ''; // Reset error message

  try {
    const response = await authService.login({email: email.value, password: password.value});
    authService.setAuthHeader(response.access_token);

    email.value = '';
    password.value = '';

    router.push('/home');
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
};

const selectedApiAddress = ref(localStorage.getItem('apiAddress') || 'https://staging.spaero.co.uk/api');

const handleApiAddressChange = async (event: CustomEvent) => {
  const newValue = event.detail.value;
  await setApiAddress(newValue);
  selectedApiAddress.value = newValue;
};

onMounted(async () => {
  const storedApiAddress = localStorage.getItem('apiAddress');
  if (storedApiAddress) {
    selectedApiAddress.value = storedApiAddress;
    await setApiAddress(storedApiAddress);
  }
});
</script>

<style>
.login-header{
  background-color: var(--ion-color-primary);
  color: #fff;
  min-height: 38vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  padding-bottom: 30px;
}

  .login-header__title{
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.45em;
    margin: 0;
  }

  .login-header__text{
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0;
    max-width: 350px;
    text-align: center;
    min-height: 40px;
  }

    .login-header__text span{
      opacity: 0.7;
    }

    .login-header__text strong{
      opacity: 1;
      font-weight: 400;
    }

.login-form{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--ion-background-color);
  padding: 16px;
  box-sizing: border-box;
  position: relative;
}

  .login-form::before{
    content: '';
    display: block;
    width: 100%;
    height: 84px;
    background-color: var(--ion-color-primary);
    top: 0;
    left: 0;
    position: absolute;
  }

  .login-form__form{
    background-color: #fff;
    padding: 20px;
    color: var(--ion-color-dark);
    width: 100%;
    max-width: 28em;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0px -2px 50px 0px rgba(0, 0, 0, 0.26);
    border-radius: var(--radius);
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    margin: 0 auto;
  }

    .login-form__form--modal{
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      max-width: 100%;
      padding: 0;
      gap: 15px;
    }

  .login-form__title{
    margin: 0 0 8px;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .login-form__text{
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0;
    text-align: center;
  }

    .login-form__text a{
      color: var(--ion-color-primary);
    }

    ion-button + .login-form__text{
      text-align: center;
    }

  .login-form__forgot{
    text-align: right;
  }

.login-footer{
  margin-top: auto;
  color: var(--ion-color-tertiary);
  text-align: center;
  padding: 0 16px;
  box-sizing: border-box;
}

.login-form__modal .ion-text-start{
  padding-inline-start: 12px;
  font-family: var(--base-font);
  font-size: 1.25rem;
  font-weight: 700;
}

.login-form__modal-text{
  font-size:0.875rem;
  line-height: 1.21em;
  color: var(--ion-color-tertiary);
  opacity: 0.7;
  font-family: var(--base-font);
}

</style>
