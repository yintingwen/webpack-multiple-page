const app = require('../config/app')
const {createError} = require("./common")
let modules = {
  vue: 'xx',
  vant: {
    scripts: [
      'aa',
      {
        type: 'content',
        value: 'Vue.use'
      }],
    links: 'zz'
  },
  jq: {
    scripts: 'xixi'
  },
  baesStyle: {
    links: '12312312'
  },
}
normalizeModules()


const moduleCache = {}
// const modules = require('config/modules')

function normalizeModules() {
  Object.keys(modules).forEach(moduleName => {
    let module = modules[moduleName]
    modules[moduleName] = normalizeModule(module)
  })
  console.log(JSON.stringify(modules))
  return modules
}

function normalizeModule(module) {
  if (typeof module === 'string') {
    return {
      script: [{type: 'src', value: module}]
    }
  }
  let {scripts, links} = module
  module.scripts = normalizeModuleScriptLink(scripts, 'scripts')
  module.links = normalizeModuleScriptLink(links, 'links')
}

function normalizeModuleScriptLink(list, type) {
  if (!list) return []
  if (typeof list === 'string') {
    console.log(list, type)
    return [createModuleScriptLink(type, list)]
  }
  return list.map(item => {
    if (typeof item === 'string') {
      return createModuleScriptLink(type, item)
    }
    if (!item.type) {
      createError(`${type}使用对象配置时必须带有type`)
    }
    return item
  })
}

function createModuleScriptLink(type, value) {
  return {
    type: type === 'scripts' ? 'src' : 'href',
    value
  }
}


/**
 * 获取模块对应脚本
 * @param {*} moduleName 模块名
 * @returns
 */
function getModuleScript(moduleName) {
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
 * 获取默认模块脚本
 * @returns
 */
function getDefaultModules() {
  const {scripts} = app
  return scripts.map(item => getModuleScript)
}


