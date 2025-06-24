<template>
  <div id="action-content" class="container">
    <div class="action-bar">
      <template v-if="items" v-for="(item, index) in items">
        <ion-menu-button :id="'btn-' + index" fill="clear" :menu="'btn-' + index"  v-if="item.subItems">
          <div class="action-bar__btn">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
        </ion-menu-button>
        <ion-button :id="'btn-' + index" fill="clear" :menu="'btn-' + index" :router-link="item.url" v-else>
          <div class="action-bar__btn">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
        </ion-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IonButton, IonMenuButton } from '@ionic/vue';
  import { ActionBarItem } from '@/types/ActionBarItem';
  import { PropType } from 'vue';

  defineProps({
    items: {
      type: Array as PropType<ActionBarItem[]>
    }
  });

</script>

<style scoped>
.action-bar{
  padding: 30px 0 0;
  display: flex;
  flex-direction: row;
  gap: 38px;
}

  .action-bar ion-button, .action-bar ion-menu-button{
    margin: 0;
    --color: var(--ion-color-tertiary);
    font-size: 0.8125rem;
    --padding-top: 0;
    --padding-bottom: 0;
    --padding-start: 0;
    --padding-end: 0;
    width: auto;
    height: auto;
    border: none;
  }

  .action-bar ion-button i, .action-bar ion-menu-button i{
    display: flex;
    width: 70px;
    height: 70px;
    border: 1px solid rgba(0, 0, 0, 0.07);
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
    font-size: 1.375rem;
    color: var(--ion-color-primary);
  }

  .action-bar__btn{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
  }
</style>