const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require("path")

module.exports = {
  mode: 'production',
  entry: './modules/index.js',
  output: {
    path: path.join(process.cwd(), 'dist', 'modules'),
    filename: 'index.js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'modules', //必须，唯一 ID，作为输出的模块名，使用的时通过 ${name}/${expose} 的方式使用；
      library:
        {type: "var", name: 'modules'}
      ,
      filename: 'remoteEntry.js', // 构建出来的文件名
      exposes: { //可选，表示作为 Remote 时，export 哪些属性被消费；
        './vue': 'vue',
        './utils': './src/utils.js'
      }
    })
  ]
}
