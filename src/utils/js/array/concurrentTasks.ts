function timeOut(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
// 并发任务控制
class SuperTasks {
  tasks: {
    task: () => Promise<any>
    resolve: (value: unknown) => void
    reject: (value: unknown) => void
  }[]
  maxConcurrency: number
  currentRunning: number
  constructor() {
    this.maxConcurrency = 2
    this.tasks = []
    this.currentRunning = 0
  }
  add(task: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject
      })
      this.run()
    })
  }

  run() {
    while (this.currentRunning < this.maxConcurrency && this.tasks.length) {
      this.currentRunning++
      const { task, resolve, reject } = this.tasks.shift()!
      task()
        .then(resolve, reject)
        .finally(() => {
          this.currentRunning--
          this.run()
        })
    }
  }
}
const superTask = new SuperTasks()
let lastTime = new Date().getTime()
function addTask(time: number, name: string) {
  superTask
    .add(() => timeOut(time))
    .then(() => {
      console.log(`在${Math.floor((new Date().getTime() - lastTime) / 1000)}s, 任务${name}完成`)
    })
}
addTask(10 * 1000, '任务一')
addTask(5 * 1000, '任务二')
addTask(4 * 1000, '任务三')
addTask(3 * 1000, '任务四')
addTask(1 * 1000, '任务五')
