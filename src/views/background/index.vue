<template>
  <div class="box">
    <BackByCanvas :type="bgType" />
    <n-button class="updata" @click="upDataBg" type="primary">
      更换背景
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import BackByCanvas from '@/components/BackByCanvas/index.vue'
 
const bgData = reactive({
  item: ['dom1', 'dom2'],
  index: 0
}) 

const bgType = computed(() => {
  return bgData.item[bgData.index]
})
const collapsed = ref(false)

const upDataBg = () => {
  if(bgData.index >= bgData.item.length - 1){
    bgData.index = 0
  } else {
    bgData.index += 1
  }
}
</script>

<style scoped lang="scss">
.box{
  position: relative;
  .updata{
    position: absolute;
    top: 20px;
    right: 40px;
  }
  
}
</style>
