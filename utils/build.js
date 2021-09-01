import HtmlWebpackPlugin from 'html-webpack-plugin'
import { getFullPath } from './common.js'

/**
 * 根据命令行参数获取需要构建的页面配置
 * @param {*} env
 * @param {*} pages pages配置项
 */
export function getBuildPages(env, pagesConfig) {
  let buildPages = {}

  if (env.page) {
    const envkeys = Object.keys(env)
    envkeys.forEach(key => {
      const page = pagesConfig[key]
      page && (buildPages[key] = page)
    })
  } else {
    buildPages = pagesConfig
  }

  return buildPages
}

/**
 * 获取webpack pages所需配置
 * @param {*} pages 标准化之后的pages
 * @returns
 */
export function getWebpackPagesConfig(pages) {
  const entry = {}
  const htmlPlugins = []

  pages.forEach((item) => {
    entry[item.name] = item.entry
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: item.template,
        filename: getFullPath('dist', item.name, 'index.html'),
        chunks: [item.name],
        assets: {
          scripts: item.scripts,
          links: item.links,
        },
      })
    )
  })

  return { entry, htmlPlugins }
}
