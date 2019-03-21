const path = require('path');
// const SkeletonWebpackPlugin = require('../../lib');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const SVG_ICON_PATH = 'src/assets/svg-icons';  // 增加svgIcon图标目录
const env = process.env.NODE_ENV;

const addrConfig = {
  'development': '/',
  'production': `https://cdn-static.uoko.com/ET-FE/yz/`
}

const getBaseUrl = (env) => {
  if (!process.env.VUE_APP_TEST) {    // 打包模式，应用于非测试下
    return addrConfig[env];
  } else {
    // process.env.TEST_API_URL 为真，则为测试环境下，打包方式为生产
    return '/';
  }
}

module.exports = {
  baseUrl: getBaseUrl(env),
  assetsDir: 'static',
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,   // 形成一个新代码块最小的体积
        minChunks: 1,  // 在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
        maxAsyncRequests: 5,  // 按需加载时候最大的并行请求数。
        maxInitialRequests: 3,  // 一个入口最大的并行请求数
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          vant: {
            test: /[\\/]node_modules[\\/]vant[\\/]/,
            priority: -4
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/)
      .exclude
        .add(path.resolve(__dirname, SVG_ICON_PATH))
        .end()

        // 替换 svg 的处理
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .include
        .add(path.resolve(__dirname, SVG_ICON_PATH))
        .end()
    .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    .use('svgo-loader')
        .loader('svgo-loader')
        .options({
          plugins: [
            {removeTitle: true},
            {convertColors: {shorthex: false}},
            {convertPathData: false}
          ]
        })
  }
}