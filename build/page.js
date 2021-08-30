const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: 'production',
  entry:  {
    one: './src/pages/one/index.js',
    two: './src/pages/two/index.js'
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: "[name]/index.js"
  },
  experiments: {
    topLevelAwait: true,
  },
  externals: {
    vue: 'Vue'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './src/pages/one/index.html'),
      filename: path.join(process.cwd(), 'dist', 'one', 'index.html'),
      chunks: ['one'],
      assets: {
        js: ['../public/js/vue.js', '../public/js/axios.js']
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './src/pages/two/index.html'),
      filename: path.join(process.cwd(), 'dist', 'two', 'index.html'),
      chunks: ['two']
    })
  ]
}
