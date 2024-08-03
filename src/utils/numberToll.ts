/**
 *
 * @deprecated 获取最大最小随机数  包含最小值和最大值
 * @param {number} min
 * @param {number} max
 * @returns {number}  返回包含最小值和最大值的随机数
 */
export const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // 包含最小值和最大值
}
