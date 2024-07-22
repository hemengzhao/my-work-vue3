<template>
  <div class="bg-com">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const canvas = ref(null)
</script>
<style lang="scss" scoped>
.bg-com {
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
