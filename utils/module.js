import { error } from './common.js'
const scriptCache = {}
const linkCache = {}

/**
 * 转换模块名为脚本字符串
 * @param {*} moduleName 模块名
 * @param {*} modules 格式化之后的modules
 * @param {boolean} isScript 是否是script
 * @returns
 */
export function conversionModule(moduleName, modules, isScript) {
  const cache = isScript ? scriptCache : linkCache
  const converter = isScript ? moduleToScript : moduleToLink
  return cache[moduleName] || (cache[moduleName] = converter(modules[moduleName]))
}

/**
 * 格式化单个模块
 * @param {*} module
 * @returns
 */
export function normalizeModule(module) {
  if (typeof module === 'string') {
    return { scripts: [{ type: 'file', value: module }], links: [] }
  }

  const moduleClone = {}
  let { scripts, links } = module
  moduleClone.scripts = normalizeModuleScriptLink(scripts)
  moduleClone.links = normalizeModuleScriptLink(links)
  return moduleClone
}

/**
 * 格式化模块的scripts或links
 * @param {*} list 列表
 * @param { 'scripts' | 'links' } type 类型
 * @returns
 */
function normalizeModuleScriptLink(list, type) {
  if (!list) return []
  if (typeof list === 'string') {
    return [createModuleInstance(list)]
  }
  return list.map((item) => {
    if (typeof item === 'string') {
      return createModuleInstance(item)
    }
    if (!item.type) {
      error(`${type}使用对象配置时必须带有type`)
    }
    return item
  })
}

/**
 * 创建script或link
 * @param {*} type
 * @param {*} value
 * @returns
 */
function createModuleInstance(value, type = 'file') {
  return {
    type,
    value,
  }
}

/**
 * 转换模块为script/link
 * @param {*} module
 */
function moduleToScript(module) {
  const { scripts } = module
  return scripts.map((item) => {
    const { type, value } = item
    if (type === 'file') {
      return `<script src="${value}"></script>`
    } else {
      return `<script>${value}</script>`
    }
  })
}
function moduleToLink(module) {
  const { links } = module
  return links.map((item) => {
    const { type, value } = item
    if (type === 'file') {
      return `<link href="${value}"></link>`
    } else {
      return `<link>${value}</link>`
    }
  })
}
