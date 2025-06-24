<template>
    <ion-button
      :disabled="loading"
      @click="openPdf"
      :color="buttonColor"
      :expand="expand"
      :fill="fill"
      :size="size"
    >
      <ion-icon
        v-if="loading"
        name="hourglass-outline"
        slot="start"
      ></ion-icon>
      {{ buttonText }}
    </ion-button>
    <ion-toast
      v-if="errorMessage"
      :is-open="!!errorMessage"
      :message="errorMessage"
      :duration="3000"
      :color="'danger'"
      @didDismiss="errorMessage = ''"
    ></ion-toast>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import pdfDownloadService from '@/services/pdfDownloadService';
import {
  IonButton,
  IonIcon,
  IonToast,
  toastController
} from '@ionic/vue';

export default defineComponent({
  name: 'PdfDownloader',
  components: {
    IonButton,
    IonIcon,
    IonToast
  },
  props: {
    /**
     * The URL of the PDF file to download
     */
    fileUrl: {
      type: String,
      required: true
    },
    /**
     * Text to display on the view button
     */
    buttonText: {
      type: String,
      default: 'View PDF'
    },
    /**
     * Icon to display on the button (Ionicons name)
     */
    icon: {
      type: String,
      default: 'document-outline'
    },
    /**
     * Color of the button (Ionic color)
     */
    buttonColor: {
      type: String,
      default: 'primary'
    },
    /**
     * Button expand property (Ionic expand)
     */
    expand: {
      type: String as () => 'block' | 'full',
      default: 'block'
    },
    /**
     * Button fill property (Ionic fill)
     */
    fill: {
      type: String as () => 'default' | 'solid' | 'clear' | 'outline',
      default: 'solid'
    },
    /**
     * Button size (Ionic size)
     */
    size: {
      type: String as () => 'default' | 'small' | 'large',
      default: 'default'
    }
  },
  emits: ['view-started', 'view-error', 'view-complete'],
  setup(props, { emit }) {
    const loading = ref(false);
    const errorMessage = ref('');

    /**
     * Initiates the PDF viewing process
     */
    const openPdf = async () => {
      if (loading.value) return;
      
      loading.value = true;
      errorMessage.value = '';
      
      try {
        emit('view-started');
        
        await pdfDownloadService.openPdfInAppBrowser(props.fileUrl);
        
        // Show success toast
        const toast = await toastController.create({
          message: 'PDF opened in browser',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        
        emit('view-complete');
      } catch (error) {
        console.error('Error in PDF download component:', error);
        
        // Display error message
        if (error instanceof Error) {
          errorMessage.value = error.message;
        } else {
          errorMessage.value = 'An unknown error occurred';
        }
        
        emit('view-error', errorMessage.value);
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      errorMessage,
      openPdf
    };
  }
});
</script>

<style scoped>
.pdf-downloader {
  display: inline-block;
}
</style>
