<template>
  <ion-select
    class="spaero-select"
    :label="label"
    label-placement="stacked"
    :placeholder="placeholderText"
    :value="modelValue"
    :disabled="disabled"
    @ionChange="handleChange"
  >
    <ion-select-option :value="null" selected>Please select</ion-select-option>
    <ion-select-option v-for="option in options" :key="option[selectkey]" :value="option[selectkey]">
      <template v-if="Array.isArray(selectvalue)">
        <span v-for="(val, index) in selectvalue" :key="val">
          {{ option[val] }}<span v-if="index < selectvalue.length - 1"> / </span>
        </span>
      </template>
      <template v-else>
        {{ option[selectvalue] }}
      </template>
    </ion-select-option>
  </ion-select>
</template>

<script setup lang="ts">
  import { IonSelect, IonSelectOption } from '@ionic/vue';
  import { PropType, defineEmits } from 'vue';

  // Define props
  const props = defineProps({
    placeholderText: String,
    label: String,
    options: {
      type: Array as PropType<any[]>,  // Accepting an array of objects
      required: false,
    },
    selectkey: {
      type: String,
      required: true,
    },
    selectvalue: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
    modelValue: {  // For v-model binding
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  });

  // Emit event for v-model
  const emit = defineEmits(['update:modelValue']);

  // Emit the selected value when it changes
  const handleChange = (event: any) => {
    emit('update:modelValue', event.detail.value);
  };
</script>

<style>
  ion-select.spaero-select::part(label){
    font-size: 0.875rem;
    line-height: 1.42em;
    color: var(--ion-color-tertiary);
    margin-bottom: 5px;
  }

  ion-select.spaero-select::part(placeholder), ion-select.spaero-select::part(text){
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    padding: 13px 15px;
    border-radius: var(--radius);
    font-family: var(--base-font);
    font-size: 0.9375rem;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    opacity: 1;
  }

  ion-select.spaero-select::part(icon){
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #fff;
    padding: 0 10px;
    border-left: none;
    border-radius: var(--radius);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin: 0;
    height: 47px;
    bottom: 0;
  }
</style>
