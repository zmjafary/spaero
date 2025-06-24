<template>
  <div class="quick-bar" :class="{'has-bar' : hasBar}">
    <div class="container">
      <div class="quick-bar__items">
        <QuickItemComponent v-for="item in items" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuickItemComponent from '@/components/QuickItem.vue';
import { PropType } from 'vue';
import { QuickItem } from '@/types/QuickItem';

defineProps({
  items: {
    type: Array
  },
  hasBar: Boolean,
});

</script>

<style>
.quick-bar{
 position: relative; 
}

  .has-bar.quick-bar::before{
    content: '';
    display: block;
    width: 100%;
    height: 43px;
    background-color: var(--ion-color-primary);
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .quick-bar .container{
    position: relative;
    z-index: 2;
  }

  .quick-bar__items{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    overflow-x: auto;
    margin: 0 -20px;
    padding: 0 20px 20px 20px;
  }

    .quick-bar__items::-webkit-scrollbar {
      display: none;
    }

    @media screen and (min-width: 48em){
      .quick-bar__items{
        margin: 0;
        padding: 0 0 20px;
        overflow: visible;
      }
    }
</style>