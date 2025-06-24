<template>
    <div class="home-tab__help" v-if="segment?.help">
          <h2><i class="fa-solid fa-circle-info"></i> {{ segment.help?.title }}</h2>
          <p class="home-tab__help-text">{{ segment.help?.text }}</p>
          <div class="home-tab__help-more" v-if="segment.help?.readMore">
            <ion-button class="help-tab__help-more-btn" id="open-help" fill="clear" color="tertiary">Read more</ion-button>
            <ion-modal ref="modal" trigger="open-help" class="help-tab__modal">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="end">
                    <ion-button size="large" @click="modalController.dismiss()" fill="clear" color="tertiary"><i class="fa-solid fa-xmark"></i></ion-button>
                  </ion-buttons>
                  <ion-title class="ion-text-start">{{ segment.help?.readMore?.title }}</ion-title>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding help-tab__modal-content" v-html="segment.help?.readMore?.text"></ion-content>
            </ion-modal>
          </div>
        </div>
        <div class="home-tab__controls">
          <h2 class="home-tab__item-title" v-if="segment?.itemTitle">{{ segment.itemTitle }}</h2>
          <div class="home-tab__btns" v-if="!isOrderDetailsPage && Array.isArray(props.segment.items) && props.segment.items.length">
            <Filters :applyFilterFunction="applyFilterFunction" v-if="props.segment.items[0]?.filterable?.filters" :filters="props.segment.items[0].filterable.filters" />
            <Sort :applyFilterFunction="applyFilterFunction" v-if="props.segment.items[0]?.filterable?.sort" />
          </div>
        </div>
        <div class="home-tab__elements">
          <Card v-for="item in filteredItems" :key="item?.id || Math.random()" :item="item" />
          <div class="empty-basket" v-if="segment.items && filteredItems && !filteredItems.length"> 
            <i class="fa-light fa-cart-circle-xmark"></i>
            <h2>There are no items to display</h2>
          </div>
          <component :is="segment?.component" v-if="segment?.component" :data="segment?.data"></component>
        </div>
</template>

<script setup lang="ts">

  import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, modalController, IonContent } from '@ionic/vue';
  import Filters from '@/components/Filters.vue';
  import Sort from '@/components/Sort.vue';
  import Card from '@/components/Card.vue';
  import { ref, computed } from 'vue';

  const props = defineProps({
    segment: {
      type: Object,
      required: true
    },
    isOrderDetailsPage: {
      type: Boolean,
      default: false
    },
  });

  // Define interfaces for filter and sort options
  interface FilterOptions {
    status?: string;
    quotes?: string;
    [key: string]: any;
  }

  interface SortOptions {
    sortOrder?: string;
    [key: string]: any;
  }

  interface FilterFunctionParams {
    filters?: FilterOptions;
    sort?: SortOptions;
    segment?: string | null;
    keepCurrentSegment?: boolean;
  }

  // Store filter and sort state
  const activeFilters = ref({} as FilterOptions);
  const activeSort = ref({} as SortOptions);

  // Create a computed property that will automatically update when dependencies change
  const filteredItems = computed(() => {
    // Ensure items is an array
    const items = Array.isArray(props.segment.items) ? props.segment.items : [];
    let result = [...items]; // Create a copy to avoid mutating props

    // Apply sorting if specified
    if (activeSort.value.sortOrder) {
      result.sort((a: any, b: any) => {
        // Get the date from the items
        let dateA, dateB;

        // Try to get date from 'Date Time' or 'Created At' in the body
        if (a?.body && a.body.length > 0 && a?.filterable?.sort !== undefined) {
          dateA = a.filterable.sort;
        }
        
        if (b?.body && b.body.length > 0 && b?.filterable?.sort !== undefined) {
          dateB = b.filterable.sort;
        }
        
        // If dates are found, compare them
        if (dateA && dateB) {
          
          return activeSort.value.sortOrder === 'newest' 
            ? dateB - dateA  // newest to oldest
            : dateA - dateB; // oldest to newest
        }
        
        return 0; // No change in order if dates can't be compared
      });
    }

    // Apply filters only when they are set
    for(const filter in activeFilters.value) {
      // Only process filters that have a value
      if (activeFilters.value[filter]) {
        console.log(`Applying filter: ${filter}`, activeFilters.value[filter]);
        
        result = result.filter((item: any) => {
          // Check if the item has the necessary filter structure
          if (item?.filterable?.filters?.[filter]?.callback && 
              typeof item.filterable.filters[filter].callback === 'function') {
            
            // Call the callback only once and use its result
            const filterResult = item.filterable.filters[filter].callback(activeFilters.value[filter]);
            console.log(`Filter result for ${filter}:`, filterResult);
            return filterResult;
          }

          return true; // If item doesn't have this filter, include it
        });
      }
    }

    return result;
  });

  const applyFilterFunction = ({ filters = {} as FilterOptions, sort = {} as SortOptions, segment = null }: FilterFunctionParams) => {
    console.log('HomeTabs - applyFilterFunction called with:', { filters, sort, segment });
    
    // Update the active filters and sort, which will trigger the computed property to recalculate
    activeFilters.value = filters;
    activeSort.value = sort;


  };

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
