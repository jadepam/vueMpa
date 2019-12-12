
var utils = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//缩小（压缩优化）

// 打包分析工具，可选用
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// sentry 前端错误日志监控
// const SentryPlugin = require('@tencent/webpack-sentry-plugin');

module.exports = {
    pages:utils.entries(),
    publicPath:'/index',
    outputDir: 'dist', // 默认dist
    lintOnSave: false,
    productionSourceMap: !(process.env.NODE_ENV === 'production'),
    devServer: {
      port: 8080,
      proxy: {
        '/dev': {
            // target: 'http://121.43.54.146:8090/',
            target: 'http://192.168.8.88:9008/',
            changeOrigin: true,
            pathRewrite: {
                '^/dev': ''
            }
        },//测试环境后台
        }//本地mock
    }, // 设置代理
    configureWebpack: (config) => {
        const plugins = [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            },
            sourceMap: true
          })
        ]
        // splitChunk 配置
        const splitChunksConfig = {
          cacheGroups: {
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'initial',
              minChunks: 2
            },
            common: {
              name: 'chunk-common',
              minChunks: 2,
              priority: -20,
              chunks: 'initial',
              reuseExistingChunk: true
            }
          }
        }
        if (process.env.NODE_ENV === 'production') {
          config.plugins = [...config.plugins, ...plugins]
          config.optimization.splitChunks = splitChunksConfig
        }
      }
  }