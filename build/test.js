const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'production',
  entry:  {
    two: './src/pages/two/index.js',
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: "[name]/index.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 1, // 同时引用了3次才打包
        },
        // 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        }
      }
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes:{
        modules:'modules@modules'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './public/index.html'),
      filename: path.join(process.cwd(), 'dist', 'two', 'index.html'),
      chunks: ['two']
    })
  ]
}
