import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export function createError(message) {
  throw new Error(message)
}

export function getFullPath(...args) {
  return path.join(process.cwd(), ...args)
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

/**
 * 合并数组
 * @param  {...any[]} arrays 数组
 * @returns 
 */
export function mergeArray (...arrays) {
  arrays = arrays.map((item) => (Array.isArray(item) ? item : []))
  return Array.prototype.concat.apply([], arrays)
}
 