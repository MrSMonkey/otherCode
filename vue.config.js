const path = require('path');
const fs = require('fs');
// const SkeletonWebpackPlugin = require('../../lib');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const SVG_ICON_PATH = 'src/assets/svg-icons';  // 增加svgIcon图标目录
const { currentDateTime } = require('./config');

let env;
let baseURL;
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_TITLE === 'test') { // 测试
    env = 'test';
    baseURL = '/';
  }

  if (process.env.VUE_APP_TITLE === 'pre-release') { // 预发布
    env = 'pre-release';
    baseURL = `https://fe-pre-static.uoko.com/yz_${currentDateTime}/`;
  }

  if (process.env.VUE_APP_TITLE === 'production') { // 生产
    env = 'production';
    baseURL = `https://fe-static.uoko.com/yz_${currentDateTime}/`;
  }
} else {
  env = 'development';
  baseURL = '/';
}

/**
 * 由于build时读取 vue.config.js 文件配置，与最后执行 deploy-to-qn.js 时间不一致
 * 导致两次获取的值不一致，而将不一致的值写入最后打包的文件会导致项目在生产中启动失败 
 * 故使用 node 的 fs 模块功能将当前日期时间标识符写入本地文件中
 * 执行 deploy-to-qn.js 时读取此文件中的值
 * 写入文件采用同步方式，异步可能会执行被延后导致结果不一致
 */ 
fs.writeFileSync('./local', currentDateTime, 'utf8');

module.exports = {
  baseUrl: baseURL,
  assetsDir: 'static',
  configureWebpack: {},
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
  },
  productionSourceMap: false
}