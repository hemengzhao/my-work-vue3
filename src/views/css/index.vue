<template>
  <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="attribute" tab="css属性">
        <div class="currentColor">
          <div>
            <n-color-picker v-model:value="color" />
          </div>
          <div class="box">边框颜色跟随文字颜色一致</div>
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
const color = ref()
</script>

<style scoped lang="scss">
.currentColor {
  width: 200px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  .box {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: v-bind(color);
    border: 1px solid currentColor;
    border-radius: 4px;
  }
}
</style>
