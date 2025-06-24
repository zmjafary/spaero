<template>
  <div class="checkbox-wrapper">
    <ion-checkbox
      :checked="checked"
      @ionChange="handleChange"
      :disabled="disabled"
    ></ion-checkbox>
    <span class="checkbox-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { IonCheckbox } from '@ionic/vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change']);

const handleChange = (event: CustomEvent) => {
  emit('change', event.detail.checked);
};
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
}
ion-checkbox {
  --size: 21px;
  --checkbox-background-checked: var(--ion-color-primary);
  margin-right: 10px;
}

ion-checkbox::part(container) {
  border-radius: 3px;
  border: 1px solid var(--ion-color-primary);
}

.checkbox-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgba(27, 51, 71, 1);
}
.checkbox-disabled {
  opacity: 1;
}
</style>