import { normalizePage } from "./page.js"
import { normalizeModule } from "./module.js"
import { mergeArray } from "./common.js"

/**
 * 格式化modules配置项
 * @returns
 */
export function normalizeModules (modules) {
  const modulesClone = {}
  Object.keys(modules).forEach((moduleName) => {
    let module = modules[moduleName]
    modulesClone[moduleName] = normalizeModule(module)
  })
  return modulesClone
}

export function normalizeApp (app) {
  const appClone = app
  const {template, scripts, links, modules} = app
  appClone.template = template
  appClone.scripts = mergeArray(scripts, modules)
  appClone.links = mergeArray(links, modules)
  return appClone
}

export function normalizePages (pages, app, modules) {
  return Object.keys(pages).map((pageName) => {
    let page = pages[pageName]
    return normalizePage(pageName, page, app, modules)
  })
}


