<template>
  <div :class="['dox', direction]" ref="el">
    <div class="prev">
      <img :src="showImgs[0]" :style="{ height: height + 'px' }" />
    </div>
    <div class="curr">
      <img :src="showImgs[1]" :style="{ height: height + 'px' }" />
    </div>
    <div class="next">
      <img :src="showImgs[2]" :style="{ height: height + 'px' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IngBg1 from '@/assets/img/bg1.jpg'
import IngBg2 from '@/assets/img/bg2.jpg'
import IngBg3 from '@/assets/img/bg3.webp'
import IngBg4 from '@/assets/img/bg4.webp'
import IngBg5 from '@/assets/img/bg5.webp'
import { useEventListener, useElementSize, useDebounceFn } from '@vueuse/core'

const imgs = [IngBg1, IngBg2, IngBg3, IngBg4, IngBg5]
const el = ref(null)
const { width, height } = useElementSize(el)

const showImgs = ref<string[]>([IngBg5, IngBg1, IngBg2])
const direction = ref<'up' | 'down' | 'none'>('none')
const currIndex = ref<number>(0)
const isAnimation = ref<boolean>(false)

const preloadImages = (imageArray: string[]) => {
  imageArray.forEach((image) => {
    const img = new Image()
    img.src = image
  })
}

preloadImages(imgs)

const setShowImgs = () => {
  const prev = currIndex.value - 1 < 0 ? imgs.length - 1 : currIndex.value - 1
  const next = currIndex.value + 1 >= imgs.length ? 0 : currIndex.value + 1
  showImgs.value = [imgs[prev], imgs[currIndex.value], imgs[next]]
}

watch(currIndex, () => {
  setShowImgs()
})

const onWheelFn = (deltaY: number) => {
  if (!deltaY || isAnimation.value) return

  isAnimation.value = true

  direction.value = deltaY > 0 ? 'down' : 'up'
}

useEventListener(el, 'wheel', (e) => {
  const { deltaY } = e
  onWheelFn(deltaY)
})

useEventListener(el, 'transitionend', () => {
  const directionName = direction.value
  isAnimation.value = false
  direction.value = 'none'
  let curr
  if (directionName === 'up') {
    curr = currIndex.value + 1 >= imgs.length ? 0 : currIndex.value + 1
  } else {
    curr = currIndex.value - 1 < 0 ? imgs.length - 1 : currIndex.value - 1
  }
  currIndex.value = curr
  // showImgs.value[1] = imgs[curr]
  // setTimeout(() => {
  //   currIndex.value = curr
  // }, 1000 * 5)
  // nextTick(() => {})
})
</script>

<style scoped lang="scss">
.dox {
  width: 100%;
  height: 100%;
  position: relative;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .prev,
  .next {
    height: 0;
    overflow: hidden;
    z-index: 2;
    transition: height 0.5s;
  }

  &.none {
    .prev,
    .next {
      transition: none;
    }
  }

  &.up {
    .next {
      height: 100%;
    }
  }

  &.down {
    .prev {
      height: 100%;
    }
  }

  .prev {
    img {
      top: 0;
    }
  }

  .next {
    bottom: 0;
    img {
      bottom: 0;
    }
  }

  img {
    height: 100%;
    width: 100%;
    position: relative;
    left: 0;
  }
}
</style>
