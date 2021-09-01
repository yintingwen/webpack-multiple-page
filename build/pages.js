import { normalizePages, normalizeModules, normalizeApp } from '../utils/normalize.js'
import { createError, getFullPath, getWebpackPagesConfig } from '../utils/common.js'

import modulesConfig from '../config/modules.js'
import appConfig from '../config/app.js'
import pagesConfig from '../config/pages.js'

export default ({page, name, ...env}) => {
  console.log(env)
  if (page && !pagesConfig[name]) {
    createError('该页面不存在')
  }

  const targetPageConfig = page ? { [name]: pagesConfig[name]} : pagesConfig
  const modules = normalizeModules(modulesConfig)
  const app = normalizeApp(appConfig)
  const pages = normalizePages(targetPageConfig, app, modules)
  const {entry, htmlPlugins} = getWebpackPagesConfig(pages)

  return {
    mode: 'production',
    entry,
    output: {
      path: getFullPath('dist'),
      filename: '[name]/index.js',
    },
    experiments: {
      topLevelAwait: true,
    },
    externals: {
      vue: 'Vue',
    },
    plugins: [...htmlPlugins],
  }
}
