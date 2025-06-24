<template>
  <div class="pdf-download-example">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Document Viewer</ion-card-title>
        <ion-card-subtitle>Secure PDF viewer example</ion-card-subtitle>
      </ion-card-header>
      
      <ion-card-content>
        <ion-list>
          <!-- Invoice example -->
          <ion-item>
            <ion-label>
              <h2>Invoice #12345</h2>
              <p>Order from January 15, 2025</p>
            </ion-label>
            <pdf-downloader
              slot="end"
              file-url="https://api.example.com/documents/invoice-12345.pdf"
              button-text="View Invoice"
              icon="receipt-outline"
              size="small"
              fill="outline"
              :expand="undefined"
              @view-started="handleViewStarted('Invoice')"
              @view-complete="handleViewComplete('Invoice')"
              @view-error="handleViewError"
            ></pdf-downloader>
          </ion-item>
          
          <!-- Manual example -->
          <ion-item>
            <ion-label>
              <h2>Product Manual</h2>
              <p>Installation and usage instructions</p>
            </ion-label>
            <pdf-downloader
              slot="end"
              file-url="https://api.example.com/documents/product-manual.pdf"
              button-text="View Manual"
              icon="book-outline"
              size="small"
              fill="outline"
              :expand="undefined"
              @view-started="handleViewStarted('Manual')"
              @view-complete="handleViewComplete('Manual')"
              @view-error="handleViewError"
            ></pdf-downloader>
          </ion-item>
          
          <!-- Certificate example -->
          <ion-item>
            <ion-label>
              <h2>Quality Certificate</h2>
              <p>Product certification document</p>
            </ion-label>
            <pdf-downloader
              slot="end"
              file-url="https://api.example.com/documents/certificate.pdf"
              button-text="View Certificate"
              icon="ribbon-outline"
              size="small"
              fill="outline"
              :expand="undefined"
              @view-started="handleViewStarted('Certificate')"
              @view-complete="handleViewComplete('Certificate')"
              @view-error="handleViewError"
            ></pdf-downloader>
          </ion-item>
        </ion-list>
        
        <!-- Full-width download button example -->
        <div class="full-width-button">
          <pdf-downloader
            file-url="https://api.example.com/documents/report.pdf"
            button-text="View Full Report"
            icon="document-text-outline"
            button-color="tertiary"
            @view-started="handleViewStarted('Report')"
            @view-complete="handleViewComplete('Report')"
            @view-error="handleViewError"
          ></pdf-downloader>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PdfDownloader from '@/components/PdfDownloader.vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  toastController
} from '@ionic/vue';

export default defineComponent({
  name: 'PdfDownloadExample',
  components: {
    PdfDownloader,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    /**
     * Handle PDF viewer started event
     */
    const handleViewStarted = (documentType: string) => {
      console.log(`${documentType} viewer started`);
      // You could update analytics or show a loading indicator here
    };

    /**
     * Handle PDF viewer complete event
     */
    const handleViewComplete = (documentType: string) => {
      console.log(`${documentType} opened in browser`);
      // You could update analytics or log the view here
    };

    /**
     * Handle PDF viewer error event
     */
    const handleViewError = async (errorMessage: string) => {
      console.error('PDF viewer error:', errorMessage);
      
      // Show error toast (in addition to the one shown by the component)
      const toast = await toastController.create({
        message: `Failed to open PDF: ${errorMessage}`,
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
      
      // You could log the error or retry the download here
    };

    return {
      handleViewStarted,
      handleViewComplete,
      handleViewError
    };
  }
});
</script>

<style scoped>
.pdf-download-example {
  max-width: 600px;
  margin: 0 auto;
}

.full-width-button {
  margin-top: 20px;
}
</style>
