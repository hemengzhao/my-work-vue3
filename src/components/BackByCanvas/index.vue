<template>
  <div>
       <code-rain v-if="type === 'dom1'" />
    <star-point v-else-if="type === 'dom2'" />
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
