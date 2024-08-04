<template>
  <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="attribute" tab="css属性">
        <div>
          <div>边框颜色跟随文字颜色一致</div>
          <div>currentColor</div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="infiniteBanner" tab="无视差滚动">
        <div style="height: 100vh">
          <infinite-banner />
        </div>
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦">
        七里香 {{ cunts }} <n-button @click="cunts++">点击</n-button></n-tab-pane
      >
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import infiniteBanner from './compon/infiniteBanner.vue'
const cunts = ref<number>(0)
</script>

<style scoped lang="scss"></style>
