const path = require('path');
// const SkeletonWebpackPlugin = require('../../lib');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const env = process.env.NODE_ENV;

const addrConfig = {
  'development': '/',
  'test': '/app/pandora/',
  'production': `https://cdn-static.uoko.com/ET-FE/dp/`
}

const getBaseUrl = (env) => {
  return addrConfig[env];
}

module.exports = {
  baseUrl: getBaseUrl(env),
  assetsDir: 'static',
  configureWebpack: {
    // plugins: [
    //   new SkeletonWebpackPlugin({
    //     webpackConfig: {
    //       entry: {
    //         app: path.join(__dirname, './src/components/Skeleton/Skeleton.js'),
    //       },
    //     },
    //     minimize: true,
    //     quiet: true,
    //   }),
    // ],
  }
};