<template>
  <div class="home-tabs" v-if="segments">
    <ion-segment v-model="currentSegment" :scrollable="true" class="home-tabs__list">
      <ion-segment-button :value="segment.value" v-for="segment in segments" layout="icon-start">
        <i :class="segment.icon" v-if="segment.icon"></i>
        {{ segment.title }}
      </ion-segment-button>
    </ion-segment>
    <div class="home-tabs__content">
      <div class="home-tab" v-for="(segment, index) in segments" v-show="currentSegment == segment.value || (currentSegment == null && index == 0)">
        <ASegment :segment="segment" :isOrderDetailsPage="isOrderDetailsPage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IonSegment, IonSegmentButton } from '@ionic/vue';
  import { ref, watch, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import ASegment from '@/components/ASegment.vue';
  import { Segment } from '@/types/Segment';

  const route = useRoute();

  const isOrderDetailsPage = computed(() => {
    return route.path.startsWith('/order/details/');
  });

  const props = defineProps({
    segments: {
      type: Array as () => Segment[],
      required: true
    },
    data: {
      type: Object
    }
  });

  const currentSegment = ref((props.segments && props.segments.length) ? props.segments[0].value : null);
  
</script>

<style scoped>

  ion-segment{
    --background: transparent;
    border-radius: 0;
    font-family: var(--base-font);
  }

    ion-segment::-webkit-scrollbar {
      display: none;
    }

  ion-segment-button{
    --color-checked: var(--ion-color-primary);
    --color-hover: var(--ion-color-primary);
    --background-checked: transparent;
    --border-width: 0;
    --border-radius: 0;
    --padding-inline-start: 0;
    --indicator-box-shadow: none;
    --padding-start: 0;
    --padding-end: 0;
    --padding-bottom: 15px;
    --background: transparent;
    --indicator-color: transparent;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    align-items: flex-start;
    font-size: 0.875rem; 
  }

    ion-segment-button::part(native){
      opacity: 0.4;
    }

    ion-segment-button:hover::part(native), ion-segment-button:focus::part(native), ion-segment-button.segment-button-checked::part(native){
      opacity: 1;
    }

    ion-segment-button.segment-button-checked, ion-segment-button:hover, ion-segment-button:focus{
      opacity: 1 !important;
    }

    ion-segment-button.segment-button-checked{
      border-bottom: 1px solid var(--ion-color-primary);
    }

    ion-segment-button i{
      margin-right: 8px;
    }

  ion-modal ion-content{
    --background: #fff;
  }
  
  ion-modal ion-title{
    padding-inline-start: 12px;
    font-family: var(--base-font);
    font-size: 1.25rem;
    font-weight: 600;
  }

  .empty-basket {
    text-align: center;
    color: var(--ion-color-tertiary);
    padding: 100px 0;
    margin: 0 auto;
  }

  .empty-basket i {
    font-size: 1.875rem;
  }

  .empty-basket h2 {
    font-weight: 600;
    margin: 8px 0;
    font-size: 1rem;
    line-height: 1.45em;
  }

  .empty-basket p {
    opacity: 0.7;
    font-size: 0.875rem;
  }
</style>

<style>
.home-tabs__list{
  padding: 30px 0 0 0;
  gap: 20px;
  position: relative;
}

  .home-tabs__list::after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    bottom: 0;
    left: 0;
    position: absolute;
    z-index: 1;
  }

  .home-tab{
    padding: 18px 0;
  }

  .home-tab__controls{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .home-tab__item-title{
    font-weight: 600;
    font-size: 0.875rem;
  }

  .home-tab__btns{
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
  }

    .home-tab__item-title + .home-tab__btns{
      width: auto;
    }

  .home-tab__elements{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
  }

  .home-tab__help{
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    padding-bottom: 20px;
  }

  .home-tab__help h2{
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--ion-color-tertiary);
    display: flex;
    flex: row;
    gap: 7px;
  }

    .home-tab__help h2 i{
      color: var(--ion-color-primary);
    }

  .home-tab__help-text{
    font-size: 0.875rem;
    color: var(--ion-color-tertiary);
  }

  .home-tab__help-more ion-button{
    margin: 0;
    --padding-top: 0;
    --padding-bottom: 0;
    --padding-start: 0;
    --padding-end: 0;
    font-size: 0.875rem;
    min-height: auto;
    height: auto;
    text-decoration: underline;
    --border-radius: 0;
  }

  .help-tab__modal-content{
    font-size: 0.875rem;
    color: rgba(27, 51, 71, 1);
  }

  .help-tab__modal-content p{
    margin-top: 0;
    color: rgba(27, 51, 71, 1);
  }

  .help-tab__modal-content table{
    width: 100%;
    border: 1px solid rgba(27, 51, 71, 1);
    text-align: center;
  }

    .help-tab__modal-content table td{
      padding: 5px;
    }

    .help-tab__modal-content table tr:first-child td:nth-last-child(-n+3){
      background-color: rgba(140, 172, 197, 0.6);
    }
</style>
