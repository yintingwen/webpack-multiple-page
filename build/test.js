const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  entry:  './src/pages/one/index.js',
  output: {
    path: path.resolve(process.cwd(), 'test'),
    filename: "index.js"
  },
  external: {
    modules: 'modules'
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes:{
        'modules':'modules'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './public/index.html'),
      filename: path.join(process.cwd(), 'test', 'index.html'),
    })
  ]
}
