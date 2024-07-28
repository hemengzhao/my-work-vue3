<template>
  <canvas id="canvas" ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { getRandomIntInclusive } from '@util/numberToll.ts'
const canvasRef = ref<HTMLCanvasElement | null>(null)
const animationFrameId = ref()
const text = '1234567890abcdefghijklmnnopqrstuvwxyz'

class Point {
  r: number
  x: number
  y: number
  stepX: number
  stepY: number
  lastTime: number | null

  constructor(canvas: HTMLCanvasElement) {
    this.r = 2 * devicePixelRatio
    this.x = getRandomIntInclusive(0, canvas.width)
    this.y = getRandomIntInclusive(0, canvas.height)
    this.stepX = getRandomIntInclusive(-50, 50)
    this.stepY = getRandomIntInclusive(-50, 50)
    this.lastTime = null
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (this.lastTime) {
      const duration = (Date.now() - this.lastTime) / 1000
      let x = this.x + this.stepX * duration
      let y = this.y + this.stepY * duration
      if (x > canvas.width - this.r / 2) {
        x = canvas.width - this.r / 2
        this.stepX = -this.stepX
      }
      if (x < 0) {
        x = 0
        this.stepX = -this.stepX
      }
      if (y > canvas.height - this.r / 2) {
        y = canvas.height - this.r / 2
        this.stepY = -this.stepY
      }
      if (y < 0) {
        y = 0
        this.stepY = -this.stepY
      }
      this.x = x
      this.y = y
    }
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgb(200, 200,200)'
    ctx.fill()

    this.lastTime = Date.now()
  }
}

class Graph {
  points: Point[]
  maxDis: number

  constructor(canvas: HTMLCanvasElement) {
    this.points = new Array(150).fill(0).map(() => new Point(canvas))
    this.maxDis = 120 * devicePixelRatio
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    animationFrameId.value = requestAnimationFrame(() => {
      this.draw(ctx, canvas)
    })
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let length = this.points.length
    for (let i = 0; i < length; i++) {
      let p1 = this.points[i]
      p1.draw(ctx, canvas)
      for (let j = i + 1; j < length; j++) {
        let p2 = this.points[j]
        p2.draw(ctx, canvas)
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        if (d > this.maxDis) {
          continue
        }
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.lineWidth = 2 * devicePixelRatio
        ctx.closePath()
        ctx.strokeStyle = `rgba(200, 200,200, ${1 - d / this.maxDis})`
        ctx.stroke()
      }
    }
  }
}

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio
   
  const gra = new Graph(canvas)

  const visibilityChangeHandler = () => {
    if (document.visibilityState === 'visible') {
      console.log('页面可见')
    } else if (document.visibilityState === 'hidden') {
      console.log('页面隐藏')
      gra.points.forEach((point) => {
        point.lastTime = null
      })
    }
  }
  document.addEventListener('visibilitychange', visibilityChangeHandler)

  gra.draw(ctx, canvas)

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight 
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId.value)
    document.removeEventListener('visibilitychange', visibilityChangeHandler)
  })
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
