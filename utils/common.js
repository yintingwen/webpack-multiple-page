import path from 'path'

export function error(message) {
  throw new Error(message)
}

export function getFullPath(...args) {
  return path.join(process.cwd(), ...args)
}


/**
 * 合并数组
 * @param  {...any[]} arrays 数组
 * @returns 
 */
export function mergeArray (...arrays) {
  arrays = arrays.map((item) => (Array.isArray(item) ? item : []))
  return Array.prototype.concat.apply([], arrays)
}
 