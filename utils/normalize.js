const { createError, getFullPath } = require("./common")
const app = require('../config/app')

/**
 * 格式化pages，对象转数组
 * @param {*} pages 
 */
function normalizePages (pages) {
  const pageNames = Object.keys(pages)

  if (!pages.length) createError('pages为空')

  pages = pageNames.map(name => normalizePage(pages[name], name))
}

/**
 * 格式化单个page
 * @param {*} pageName 
 */
function normalizePage (page, name) {
  page.name = name
  normalizeEntry(page)
  normalizeModules(page)
  normalizeScripts(page)
  normalizeLinks(page)
}


/**
 * 格式化入口
 * @param {*} page 
 */
function normalizeEntry (page) {
  page.entry = getFullPath(page.entry, 'index.js')
  page.html = getFullPath(page.entry, 'index.html')
}


/**
 * 格式化page的scripts
 * @param {*} page 
 * @returns 
 */
function normalizeScripts (page) {
  const { scripts: appScripts = [] } = app
  const { scripts: pageScripts = [] } = page
  page.scripts = [ ...pageScripts, ...appScripts ]
}

/**
 * 格式化page的link
 * @param {*} page 
 * @returns 
 */
function normalizeLinks (page) {
  const { links: pageLinks = [] } = page
  const { links: appLinks = [] } = app
  page.links = [ ...pageLinks, ...appLinks ]
}

