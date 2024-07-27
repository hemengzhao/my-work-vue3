<template>
  <div>
    <BackByCanvas :type="bgType" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import BackByCanvas from '@/components/BackByCanvas/index.vue'
const bgType = ref<TCompo.IBackByCanvasType>('dom1')
const collapsed = ref(false)
</script>

<style scoped></style>
