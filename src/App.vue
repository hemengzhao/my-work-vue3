<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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
const collapsed = ref(true)
const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator'
          },
          {
            label: '羊男',
            key: 'sheep-man'
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
            href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

const renderMenuLabel = (option: MenuOption) => {
  if ('href' in option) {
    return h('a', { href: option.href, target: '_blank' }, option.label as string)
  }

  return option.label as string
}
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
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
        </n-layout-sider>
        <n-layout>
          <n-switch v-model:value="collapsed" />
          <n-layout-header>颐和园路</n-layout-header>
          <n-layout-content content-style="padding: 24px;"> 平山道 </n-layout-content>
          <n-layout-footer>成府路</n-layout-footer>
        </n-layout>
      </n-layout>
      <RouterView />
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
