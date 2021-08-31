import { getFullPath, mergeArray } from './common.js'
import { conversionModule } from './modules.js'

export function normalizePages(pages, app, modules) {
  return Object.keys(pages).map((pageName) => {
    let page = pages[pageName]
    return normalizePage(pageName, page, app, modules)
  })
}

function normalizePage(pageName, pageConfig, app, modules) {
  const sourcePage = typeof pageConfig === 'string' ? { entry: pageConfig } : pageConfig
  const page = createPage(pageName, sourcePage, app)
  conversionPageModules(page, modules)
  return page
}

function createPage(name, { entry, output, template , scripts, links, modules }, app) {
  const page = {}
  page.name = name
  page.entry = getFullPath(entry)
  page.output = getFullPath(output || `/dist/${name}/index.js`)
  page.template = getFullPath(template || app.template)
  page.scripts = mergeArray(scripts, modules, app.scripts)
  page.links = mergeArray(links, modules, app.links)
  return page
}

function conversionPageModules (page, modules) {
  const { scripts = [], links = [] } = page
  page.scripts = mergeArray(...scripts.map(module => conversionModule(module, modules, true)))
  page.links = mergeArray(...links.map(module => conversionModule(module, modules, false)))
}