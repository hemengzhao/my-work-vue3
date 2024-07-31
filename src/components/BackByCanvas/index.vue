<template>
  <div>
    <code-rain v-if="type === 'code-rain'" />
    <star-point v-else-if="type === 'star-point'" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CodeRain from './code-rain.vue'
import StarPoint from './star-point.vue'

interface Props {
  type: TCompo.IBackByCanvasType
}

defineProps<Props>()
</script>

<style scoped lang="scss"></style>
