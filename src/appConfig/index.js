let env = process.env.NODE_ENV
//临时改变环境,测试打包时使用
//env = 'test';
//env = 'pre';

const location = window.location
const siteEnv = {
  www: process.env.www
    ? `${location.protocol}//${process.env.www}/`
    : `${location.protocol}//www-local.uoko.com/`,
  passport: process.env.passport
    ? `${location.protocol}//${process.env.passport}/`
    : `${location.protocol}//passport-local.uoko.com/`
}

let hostMap = {
  development: {
    api: '/',
    auth: '/',
    fileUpload: '/'
  },
  production: {
    api: '/',
    auth: '/',
    fileUpload: '/'
  },
  test: {
    api: '/',
    auth: '/',
    fileUpload: '/'
  },
  pre: {
    api: '/',
    auth: '/',
    fileUpload: '/'
  }
}

let host = hostMap[env]

export { siteEnv }
export default {
  version: '0.1 beta',
  hostMap,
  host,
  env
}
