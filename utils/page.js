import { getFullPath, mergeArray } from './common.js'
import { conversionModule } from './module.js'

export function normalizePage(pageName, pageConfig, global, modules) {
  const sourcePage = typeof pageConfig === 'string' ? { entry: pageConfig } : pageConfig
  const page = createPage(pageName, sourcePage, global)
  conversionPageModules(page, modules)
  return page
}

export function createPage(name, { entry, output, template , scripts, links, modules }, global) {
  const page = {}
  page.name = name
  page.entry = getFullPath(entry)
  page.output = getFullPath(output || `/dist/${name}/index.js`)
  page.template = getFullPath(template || global.template)
  page.scripts = mergeArray(scripts, modules, global.scripts)
  page.links = mergeArray(links, modules, global.links)
  return page
}

export function conversionPageModules (page, modules) {
  const { scripts = [], links = [] } = page
  page.scripts = scripts.map(module => conversionModule(module, modules, true))
  page.links = links.map(module => conversionModule(module, modules, false))
}
