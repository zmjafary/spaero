<template v-if="link.help.readMore">
    <ion-button :id="'open-help-' + modalId" color="tertiary" fill="outline" expand="block">
      <i :class="link.icon" v-if="link.icon"></i>
      {{ link.link_text }}
    </ion-button>
    <ion-modal ref="modal" :trigger="'open-help-' + modalId" class="help-modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button size="large" @click="modalController.dismiss()" fill="clear" color="tertiary">
              <i class="fa-solid fa-xmark"></i>
            </ion-button>
          </ion-buttons>
          <ion-title class="ion-text-start">{{ link.help.readMore.title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding help-modal__text" v-html="link.help.readMore.text" v-if="link.help.readMore.text"></ion-content>
      <component :is="link.help.readMore.component" v-if="link.help.readMore.component" :data="link.help.readMore.data"></component>
    </ion-modal>
  </template>

<script setup lang="ts">
    import { IonButton, IonButtons, IonModal, IonContent, IonToolbar, IonHeader, IonTitle, modalController } from '@ionic/vue';
    import { ref, watch } from 'vue';
    import { HelpLink } from '@/Models/Interfaces';

    const props = defineProps({
        link: {
            type: Object as () => HelpLink,
            required: true
        },
        modalId: String,
        data: {
            type: Object
        }
    });
</script>

<style>
    ion-modal ion-title{
        padding-inline-start: 12px;
        font-family: var(--base-font);
        font-size: 1.25rem;
        font-weight: 600;
    }

    .help-modal ion-title{
        font-size: 1.25rem;
        font-weight: 600;
        color: rgba(27, 51, 71, 1);
    }

    .help-modal ion-content{
        --padding-bottom: 10px;
        --padding-end: 20px;
        --padding-start: 20px;
        --padding-top: 10px;
        --background: #fff;
    }

    .help-modal ion-content h2{
        font-size: 1rem;
        font-weight: 600;
        color: #1B3347;
        margin: 0 0 10px;
    }

    .help-modal__text{
        font-size: 0.875rem;
    }

    .help-modal__text p{
        margin-top: 0;
    }
</style>