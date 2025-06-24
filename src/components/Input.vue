<template>
  <ion-input
    class="spaero-input"
    :label="label"
    label-placement="stacked"
    :type="type"
    :placeholder="placeholderText"
  ></ion-input>
</template>

<script setup lang="ts">
import { IonInput, IonLabel } from '@ionic/vue';
import { PropType } from 'vue';

defineProps({
  placeholderText: String,
  label: String,
  type: {
    type: String as PropType<'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' | undefined>,
    required: false,
  },
  icon: String,
  value: {
    type: String
  }
});

</script>

<style>

ion-input.spaero-input{
  margin-bottom: 15px;
  text-align: left;
}

ion-input.spaero-input .input-wrapper{
  display: flex;
  flex-direction: column;
  gap: 5px;
}

ion-input.spaero-input .label-text-wrapper{
  font-size: 0.875rem;
  line-height: 1.42em;
  color: var(--ion-color-tertiary);
}

ion-input.spaero-input input.native-input{
  /* --color: #fff; */
  --placeholder-color: #1B3347;
  --placeholder-opacity: 0.6;
  padding: 13px 15px;
  border: 1px solid rgba(0,0,0,0.1);
  background-color: #fff;
  border-radius: var(--radius);
  font-family: var(--base-font);
  font-size: 0.9375rem;
}

ion-input.spaero-input.has-focus input.native-input{
  border-color: var(--ion-color-secondary);
}

ion-input.custom.ios .input-bottom .helper-text,
ion-input.custom.ios .input-bottom .counter,
ion-input.custom.md .input-bottom .helper-text,
ion-input.custom.md .input-bottom .counter {
  color: var(--ion-color-tertiary);
}



.input-disabled{
    opacity: 1 !important;
  }

    .input-disabled input.native-input{
      background-color: #F4F4F4 !important;
      color: rgba(27, 51, 71, 0.5) !important;
    }

</style>