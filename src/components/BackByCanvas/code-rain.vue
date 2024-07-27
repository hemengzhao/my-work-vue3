<template>
  <canvas id="canvas" ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { getRandomIntInclusive } from '@util/numberToll.ts'
const text = '1234567890abcdefghijklmnnopqrstuvwxyz'
const fontsize = 20
const canvasRef = ref<HTMLCanvasElement | null>(null)

let lastTime: number | null = null
const animationFrameId = ref()
const draw = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  colIndex: number[],
  column: number
) => {
  animationFrameId.value = requestAnimationFrame(() => draw(ctx, canvas, colIndex, column))
  if (lastTime && Date.now() - lastTime < 50) return
  lastTime = Date.now()
  ctx.fillStyle = 'rgba(0,0,0,0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'orange'
  ctx.textBaseline = 'top'
  ctx.font = `${fontsize}px serif`
  for (let index = 0; index < column; index++) {
    const y = colIndex[index] * fontsize
    const x = index * fontsize
    const ti = getRandomIntInclusive(0, text.length - 1)
    ctx.fillText(text[ti], x, y)
    if (y >= canvas.height && Math.random() > 0.95) {
      colIndex[index] = 0
    } else {
      colIndex[index]++
    }
  }
}

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const column = Math.floor(window.innerWidth / fontsize)
  const colIndex = new Array(column).fill(0)

  draw(ctx, canvas, colIndex, column)

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // colIndex.fill(0)
    // draw(ctx, canvas, colIndex, column)
  })
})
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId.value)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
#canvas {
  background-color: black;
}
</style>
