<template>
  <div 
    class="spaero-page__message" 
    :class="'spaero-page__message--' + type">
    <h2>
      <i :class="icon" v-if="icon"></i>
      <i class="fa-solid fa-circle-check" v-else></i>
      {{ title }}
    </h2>
    <p>{{ text }}</p>
    <br v-if="component">
    <component :is="component" v-if="component" v-bind="componentProps"/>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  title: String,
  text: String,
  icon: String,
  type: {
    type: String as PropType<'success' | 'error' | 'warning' | 'info'>,
    required: true,
  },
  component: {
    type: Object,
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  }
});
</script>

<style>
.spaero-page__message{
 --border: rgba(63, 132, 229, 0.5);
 --background: rgba(63, 132, 229, 0.1);
 --color: rgba(27, 51, 71, 1);
 border: 1px solid var(--border);
 background-color: var(--background);
 color: --color;
 border-radius: 6px; 
 padding: 15px;
 margin: 20px 0;
}

  .spaero-page__message h2{
    font-weight: 600;
    font-size: 0.9375rem;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin: 0;
  }

  .spaero-page__message i{
    font-size: 1.875rem;
    color: rgba(63, 132, 229, 1);
  }

  .spaero-page__message p{
    font-size: 0.875rem;
    margin-bottom: 0;
    color: rgba(27, 51, 71, 0.7);
  }

  .spaero-page__message--success{
    --border: rgba(50, 147, 111, 0.5);
    --background: rgba(50, 147, 111, 0.1);
    --color: rgba(27, 51, 71, 1);
  }

    .spaero-page__message--success i{
      color: rgba(50, 147, 111, 1);
    }

  .spaero-page__message--error{
    --border: rgba(214, 24, 31, 0.5);
    --background: rgba(214, 24, 31, 0.1);
  }

    .spaero-page__message--error i{
      color: rgba(214, 24, 31, 1);
    }

  .spaero-page__message--warning{
    --border: rgba(247, 152, 36, 0.5);
    --background: rgba(247, 152, 36, 0.1);
    --color: rgba(27, 51, 71, 1);
  }

    .spaero-page__message--warning i{
      color: rgba(247, 152, 36, 1);
    }
</style>