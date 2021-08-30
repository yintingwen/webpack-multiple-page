import modules from 'config/modules'
import app from '../config/app'
const moduleCache = {}


/**
 * 获取模块对应脚本
 * @param {*} moduleName 模块名
 * @returns 
 */
function getModuleScript (moduleName) {
  let module = moduleCache[moduleName]
  if (module) return module

  const moduleConfig = normalizeModule(modules[moduleName])

  if (moduleConfig.type === 'file') {
    module = `<script src${moduleConfig}></script>`
  }
  if (moduleConfig.type === 'inline') {
    module = `<script>${moduleConfig.value}</script>`
  }
  
  moduleCache[moduleName] = module
  return module
}

/**
 * 格式化模块配置
 * @param {*} module 模块配置
 * @returns 
 */
function normalizeModule (module) {
  if (typeof module === 'string') {
    module = { type: 'file', value: module }
  }
  return module
}

/**
 * 获取默认模块脚本
 * @returns 
 */
 function getDefaultModules () {
  const { scripts } = app
  return scripts.map(item => getModuleScript)
}

function normalizePageModules (page) {
  const { scripts } = app
  const 
  return []
}

