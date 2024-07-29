<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import router from '@/router/index'
console.log('router', router)
import './utils/js/array/concurrentTasks.ts'
import BackByCanvas from './components/BackByCanvas/index.vue'
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NSwitch
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'

const bgType = ref<TCompo.IBackByCanvasType>('dom1')
const collapsed = ref(false)

const menuOptions: MenuOption[] = router.options.routes.map((item) => {
  return {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: item.name
          }
        },
        { default: () => item.meta.title }
      ),
    key: item.name
  }
})

const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man') return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null
  return h(NIcon, null, { default: () => h(BookmarkOutline) })
}
const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}
</script>

<template>
  <div id="app">
    <div class="bg">
      <BackByCanvas :type="bgType" />
    </div>
    <div class="com">
      <n-layout has-sider style="height: 100%">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
        </n-layout-sider>
        <n-layout>
          <!-- <n-switch v-model:value="collapsed" />
          <n-layout-header>颐和园路</n-layout-header>
          <n-layout-content content-style="padding: 24px;"> 平山道 </n-layout-content>
          <n-layout-footer>成府路</n-layout-footer> -->

          <RouterView />
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<style scoped lang="scss">
#app {
  position: relative;
  height: 100vh;
  width: 100vw;

  .bg,
  .com {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .bg {
    overflow: hidden;
  }
  .com {
    z-index: 2;
  }
}
</style>
