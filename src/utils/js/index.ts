/**
 * 任务队列终端和恢复
 * 依次顺序执行一系列任务
 * 所有任务全部完成后可以得到每个任务的执行结果
 * 需要返回两个方法，start用于启动任务，pause用于暂停任务
 * 每个任务具有原子性，即不可中断，只能在两个任务之间中断
 *
 * @param {...Function} tasks 任务列表，每个任务无参、异步
 */
function processTasks(...tasks: Array<() => Promise<any>>) {
  let isSuspend = false
  let currentIndex = 0
  const result = []
  const run = async () => {
    if (currentIndex >= tasks.length) {
      return
    }
    if (isSuspend) return
    const data = await tasks[currentIndex]()
    result.push(data)
    currentIndex++
    run()
  }
  const start = () => {
    isSuspend = false
    run()
  }
  const pause = () => {
    isSuspend = true
  }
  return {
    start,
    pause
  }
}

const tasks = [1, 2, 3, 4, 5].map((t) => {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve, 2000)
    })
}) as Array<() => Promise<any>>

const data = processTasks(...tasks)
data.start()

setTimeout(() => data.pause(), 1000)
setTimeout(() => data.start(), 3000)
