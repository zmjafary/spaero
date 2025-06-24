<template>
  <div class="main-content">
    <div class="container">
      <HomeTabs :segments="segments" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeTabs from '@/components/HomeTabs.vue';
import { Segment } from '@/types/Segment';

const props = defineProps({
  segments: {
    type: Array as () => Segment[],
    required: true
  }
});
</script>
