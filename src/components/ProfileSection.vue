<template>
    <div class="profile-section">
      <h2>{{ title }}</h2>
      <div class="profile-section__form">
        <div v-for="(field, index) in fields" :key="index">
            <template v-if="company && company[field.model]">
                <template v-if="field.type === 'checkbox'">
                    <!-- Render checkbox input if the type is checkbox -->
                    <Checkbox :label="field.label" :disabled="true" v-model="company[field.model]" />
                </template>
                <template v-else>
                    <!-- Render text input for other types -->
                    <Input :label="field.label" :placeholder-text="field.placeholder" :disabled="true" v-model="company[field.model]" />
                </template>
            </template>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Input from '@/components/Input.vue';  // Assumes an existing Input component
  import Checkbox from '@/components/Checkbox.vue';  // Assumes an existing Checkbox component
  import { defineProps } from 'vue';
  
  // Props received from the parent
  const props = defineProps(['title', 'fields', 'company']);
  </script>
  
  <style scoped>
  .profile-section {
    margin-bottom: 20px;
  }
  
  .profile-section h2 {
    font-weight: 600;
    font-size: 0.875rem;
    color: rgba(27, 51, 71, 1);
    margin: 0 0 10px 0;
  }
  
  .profile-section__form {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(27, 51, 71, 0.1);
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  </style>
  