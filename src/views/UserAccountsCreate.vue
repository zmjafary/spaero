<template>
  <ion-page id="main-content">
    <ion-content :fullscreen="true">
      <div class="container">
        <h1>Add New User</h1>
        <p>Use the form below to enter the details of the user you want to add.</p>
      </div>
      <div class="main-content">
        <div class="container">
          <form class="new-user-form spaero-form">
            <div class="new-user-form__avatar spaero-form__block">
              <h2 class="spaero-form__title">Upload avatar</h2>
              <p class="spaero-form__text">Please select an image to use as your avatar. JPEG, PNG, and GIF, maximum file size is 2MB.</p>
              <input type="file" placeholderText="Upload Image" />
            </div>
            <div class="input-row">
              <Input label="First name" />
              <Input label="Last name" />
            </div>
            <Input label="Username" />
            <Input label="Email address" />
            <Input label="Phone number" />
            <div class="input-row">
              <!-- <Select label="Company name" placeholderText="Please select" /> -->
              <!-- <Select label="Roles" placeholderText="Please select" /> -->
            </div>
            <Checkbox />
            <!-- <Select label="Spend limit type" placeholderText="Please select" /> -->
            <Input label="Limit ($)" />
            <!-- <Select label="User status" placeholderText="Please select" /> -->
            <Button color="secondary" btnText="Add new user" :hasGradient="true" expand="block"></Button>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts"> 
import { IonPage, IonContent } from '@ionic/vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import Checkbox from '@/components/Checkbox.vue';
import Select from '@/components/Select.vue';
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

  ion-button{
    width: 100%;
  }

</style>