<template>
  <div>
    <!-- <code-rain/> -->
    <star-point />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CodeRain from './code-rain.vue'
import StarPoint from './star-point.vue'
defineProps<{
  type: TCompo.IBackByCanvasType
}>()
</script>

<style scoped lang="scss"></style>
