import { normalizeModules } from '../utils/modules.js'
import { normalizePages } from '../utils/pages.js'
import { normalizeApp } from '../utils/app.js'

import modulesConfig from '../config/modules.js'
import appConfig from '../config/app.js'
import pagesConfig from '../config/pages.js'
import { getFullPath, getWebpackPagesConfig } from '../utils/common.js'

const modules = normalizeModules(modulesConfig)
const app = normalizeApp(appConfig)
const pages = normalizePages(pagesConfig, app, modules)
const { entry, htmlPlugins } = getWebpackPagesConfig(pages)

export default {
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
