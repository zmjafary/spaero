<template>
  <ion-content class="ion-padding">
    <i :class="icon" v-if="icon"></i>
    <i class="fa-light fa-circle-check" v-else></i>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <component :is="component" v-if="component" v-bind="compProps" :compProps="compProps" />
    <Button btnText="Close" :hasGradient="true" color="secondary" btnFill="solid" expand="block" @click="closeModal"  />
  </ion-content>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IonModal, IonToolbar, IonContent, modalController } from '@ionic/vue';
import Button from './Button.vue';

const props = defineProps({
  title: String,
  text: String,
  icon: String,
  component: Object,
  compProps: Object
});

const closeModal = async () => {
  await modalController.dismiss();
}
</script>

<style scoped>


i{
  color: rgba(68, 119, 161, 1);
  font-size:3.125rem;
  line-height: 1em;
  margin: 0 auto 10px;
}

h2{
  font-size: 1.25rem;
  line-height: 1.45em;
  font-weight: 600;
}

p{
  color: rgba(27, 51, 71, 0.6);
  font-size: 0.875rem;
  line-height: 1.42em;
  margin-bottom: 20px;
}

ion-content{
  --padding-start: 20px;
  --padding-end: 20px;
  --padding-top: 20px;
  --padding-bottom: 20px;
  --ion-background-color: #fff;
  border-top: none;
  text-align: center;
}

  /* TODO: WORK OUT HOW TO SET HEIGHT OR ALIGN CONTENT FOR DESKTOP */
  /* ion-content .inner-scroll{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */
  
</style>