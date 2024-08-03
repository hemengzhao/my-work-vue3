/**
 * @description 数组去重
 * 两个属性相同的对象也认为是重复的
 * @param {Array} Array
 * @return {Array} arr
 */
export function uniqueArray(arr: any[]) {
  const result: any[] = []
  for (let i = 0; i < arr.length; i++) {
    let isRepeat = false
    for (let j = 0; j < result.length; j++) {
      if (isEqual(arr[i], result[j])) {
        isRepeat = true
        break
      }
    }
    if (!isRepeat) {
      result.push(arr[i])
    }
  }
  return result
}

/**
 * @description  判断数据是否是原始类型数据
 * @param {} param1
 */
export function isPrimitive(data: any) {
  return typeof data === null || (typeof data !== 'object' && typeof data !== 'function')
}

/**
 * @description  比较两个参数是否相等
 * @param {} param1
 * @param {} param2
 * @return {Boolean}
 */
export function isEqual(object1: any, object2: any): boolean {
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return Object.is(object1, object2)
  }

  let obj1Keys = Object.entries(object1)
  let obj2Keys = Object.entries(object2)

  if (obj1Keys.length !== obj2Keys.length) return false
  for (const [key, value] of obj1Keys) {
    if (!isEqual(value, object2[key])) {
      return false
    }
  }
  return true
}
