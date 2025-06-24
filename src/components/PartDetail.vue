<template>
    <ion-content class="part-detail">
        <h2>Summary</h2>
        <ion-row>
            <ion-col>Description</ion-col>
            <ion-col>{{ data.description ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Part Number</ion-col>
            <ion-col>{{ data.part_number ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Serial Number</ion-col>
            <ion-col>{{ data.serial_number ?? '-' }}</ion-col>
        </ion-row>
        <ion-row v-if="data.stock_image && data.stock_image.length">
            <ion-col>Stock Image</ion-col>
            <ion-col>
                <ion-button
                    :href="data.stock_image[0].url"
                    icon="book-outline"
                    size="small"
                    fill="outline"
                    >
                    Download
                    </ion-button>
                </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Comments</ion-col>
            <ion-col>{{ data.comments  ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Quality Review</ion-col>
            <ion-col>{{ data.rating ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Condition</ion-col>
            <ion-col>{{ data.condition ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Certificate Type</ion-col>
            <ion-col>{{ data.certificate_type ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Traceability Type</ion-col>
            <ion-col>{{ data.traceability }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Warranty</ion-col>
            <ion-col>{{ data.warranty ?? '-' }} Months</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Lead Time</ion-col>
            <ion-col>{{ data.lead_time ?? '-' }} Days</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Target Dispatch</ion-col>
            <ion-col>{{ data.target_dispatch ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Comments</ion-col>
            <ion-col>{{ data.comments  ?? '-' }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>AOG Fee</ion-col>
            <ion-col>
                ${{ data.aog_fee  ?? '-' }}<br />
                <i style="opacity: .5">(Add In Cart)</i>
            </ion-col>
        </ion-row>
        <ion-row v-if="data.certificate_file && data.certificate_file.length">
            <ion-col>Certificate Link</ion-col>
            <ion-col>
              <pdf-downloader
                slot="end"
                :file-url="data.certificate_file[0].url"
                button-text="Download"
                icon="book-outline"
                size="small"
                fill="outline"
                :expand="undefined"
              ></pdf-downloader>
            </ion-col>
        </ion-row>
        <ion-row v-if="data.traceability_file && data.traceability_file.length">
            <ion-col>Traceability Link</ion-col>
            <ion-col>
              <pdf-downloader
                slot="end"
                :file-url="data.traceability_file[0].url"
                button-text="Download"
                icon="book-outline"
                size="small"
                fill="outline"
                :expand="undefined"
              ></pdf-downloader>
            </ion-col>
        </ion-row>      
        <ion-row>
            <ion-col>Quality Review</ion-col>
            <ion-col>{{ data.quality_review ?? '-' }}</ion-col>
        </ion-row>

    </ion-content>
    <ion-footer class="part-detail__footer">
        <ion-row>
            <ion-col>
                Outright Price
            </ion-col>
            <ion-col>
                ${{ parseFloat(data.outright) > 0 ? data.outright : '-' }}
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script setup lang="ts">
    import { IonRow, IonCol, IonFooter } from '@ionic/vue';
    import { defineProps } from 'vue';
    import PdfDownloader from './PdfDownloader.vue';

    const props = defineProps({
        data: Object
    });
    // TODO: Ensure data is formatted correctly
</script>

<style>

.part-detail ion-row ion-col{
    padding: 5px 0;
}

.part-detail ion-row ion-col:first-child{
    font-size: 0.875rem;
    color: rgba(27, 51, 71, 0.7);
}

.part-detail ion-row ion-col:last-child{
    text-align: right;
    font-weight: 600;
    font-size: 0.875rem;
    color: rgba(27, 51, 71, 1);
}

.part-detail ion-row:has(+ h2){
    margin-bottom: 10px;
}

.part-detail__footer{
    padding: 16px 20px;
    font-weight: 700;
    font-size: 1.0625rem;
}

.part-detail__footer ion-row ion-col:last-child{
    text-align: right;
}

</style>
