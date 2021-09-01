import { normalizePages, normalizeModules, normalizeApp } from '../utils/normalize.js'
import { error, getFullPath } from '../utils/common.js'
import { getBuildPages, getWebpackPagesConfig } from '../utils/build.js'

import modulesConfig from '../config/modules.js'
import appConfig from '../config/app.js'
import pagesConfig from '../config/pages.js'

export default ( env ) => {
  const buildPagesConfig = getBuildPages(env, pagesConfig)

  if (!Object.keys(buildPagesConfig).length) {
    error('请指定正确的页面名称')
  }

  const modules = normalizeModules(modulesConfig)
  const app = normalizeApp(appConfig)
  const pages = normalizePages(buildPagesConfig, app, modules)
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
