const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pages = require('../config/pages')

const compiler = webpack({
  entry: {
    one: './src/pages/one/index.js',
    two: './src/pages/two/index.js',
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: "[name]/index.js"
  },
  plugins: [
    ...getHtmlWebpackPlugins(),
    new ModuleFederationPlugin({
      name: 'page', //必须，唯一 ID，作为输出的模块名，使用的时通过 ${name}/${expose} 的方式使用；
      remotes:{
        'modules':'modules'
      }
    })
  ]
})

function getHtmlWebpackPlugins (page) {
  return pages.map(item => {
    return new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './public/index.html'),
      filename: path.join(process.cwd(), 'dist', item, 'index.html'),
    })
  })
}

compiler.run((e) => {
  console.log(e)
})
