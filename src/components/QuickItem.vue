<template>
  <ion-card class="quick-item" v-if="item">
    <ion-card-header>
      <ion-card-title>{{  item.title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div>
        <h3>{{ item.number }}</h3>
        <p v-if="item.label">{{  item.label }}</p>
      </div>
      <i v-if="item.icon" :class="item.icon"></i>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent, PropType } from 'vue';
  import { QuickItem } from '@/types/QuickItem';

  const props = defineProps({
    item: {
      type: Object
    }
  });

  // export default defineComponent({
  //   components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
  // });

</script>

<style scoped>

  ion-card {
    --color: var(--ion-color-tertiary);
    --border-radius: var(--radius);
    width: 190px;
    margin: 0;
    font-family: var(--base-font);
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }

    @media screen and (min-width: 48em){
      ion-card{
        width: 25%;
        flex: 1 1 auto;
        box-sizing: border-box;
      }
    }

  ion-card-header{
    border-bottom: 1px solid #0000000F;
    padding: 12px;
  }

  ion-card-title {
    font-weight: 600;
    font-size: 0.8125rem;
    margin: 0;
  }

  ion-card-content{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 15px;
    align-items: center;
    justify-content: space-between;
    margin: auto 0;
  }

    ion-card-content h3{
      font-size: 1.875rem;
      font-weight: 600;
      margin: 0 auto 0 0;
    }

    ion-card-content i{
      font-size: 1.875rem;
      color: var(--ion-color-secondary-shade);
    }

/* .quick-item{
  background-color: var(--ion-color-primary-contrast);
  color: var(--ion-color-tertiary);
  border-radius: var(--radius);
  font-family: var(--base-font);
  width: 190px;
  line-height: 1.46em;
  box-shadow: 0px -2px 50px 0px rgba(0, 0, 0, 0.26);
}

.quick-item__title{
  font-weight: 600;
  font-size: 0.8125rem;
  padding: 12px;
  margin: 0;
  
}

.quick-item__content{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px 15px;
  align-items: center;
  color: var(--ion-color-secondary-shad);
}

  .quick-item__content h3{
    font-size: 1.875rem;
    color: var(--ion-color-tertiary);
    font-weight: 600;
    margin: 0 auto 0 0;
  } */

</style>