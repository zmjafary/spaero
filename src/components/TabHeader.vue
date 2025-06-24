<template>
  <header class="tab-header">
    <div class="container">
      <h1 class="tab-header__title">{{ title }}</h1>
      <div class="tab-header__text">
        <p>{{ text }}</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  text: String
});
</script>

<style>
  .tab-header{
    background-color: var(--ion-color-primary);
    color: var(--ion-color-primary-contrast);
    padding: 25px 0 20px;
  }

  .tab-header__title{
    font-weight: 700;
    font-size: 1.5rem;
    font-family: var(--base-font);
  }
  
  .tab-header__text{
    font-family: var(--base-font);
    font-size: 0.875rem;
    opacity: 0.7;
    line-height: 1.4em;
  }
</style>