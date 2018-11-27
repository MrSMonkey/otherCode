# 星空业主服务号

> 星空业主服务号项目开发指南

## 技术栈

[react 16.4.1](https://reactjs.org/)

[react-router(react-router-dom) 4.3.1](https://reacttraining.com/react-router/web/guides/philosophy)

[react-redux 5.0.7](https://redux.js.org/basics/usage-with-react)

[redux-saga 0.16.0](https://redux-saga.js.org/docs/api/)

[connected-react-router](https://github.com/supasate/connected-react-router)

## 项目配置

> 项目配置了一些 postcss 插件及 babel 插件，以提升开发体验，有疑问请访问相关插件链接，查看官方文档

### css 相关插件(主要是 postcss 插件)

- [postcss-import](https://www.npmjs.com/package/postcss-import)

- [postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport)

- [autoprefixer](https://www.npmjs.com/package/autoprefixer)

- [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)

### js 相关插件

项目基于 create-react-app 搭建，除了官方支持的以下特性外:

- [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator)
- [Async/await](https://github.com/tc39/ecmascript-asyncawait)
- [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread)
- [Dynamic import()](https://github.com/tc39/proposal-dynamic-import)
- [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields)
- [JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Flow](https://flowtype.org/)

还支持

- [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)

### css-in-js 方案

主要采用[react-css-modules](https://github.com/gajus/react-css-modules)方案，建议配合 decorator 使用

### 注意事项

- 项目默认会将非 node_modules 文件夹中的 css 文件中的 px 单位转换为 vw, 若不需要转换，请将 css 文件以.px.css 后缀命名
- 默认会将对非 node_modules 文件中的类名应用 css-modules 规则，若  需要写全局样式，请将 css 文件以.global.css 后缀命名

### 项目启动说明

cd 到项目目录下，执行

```bash
yarn install //npm install
```

安装完成后执行

```bash
npm start
```

项目构建

```bash
npm run build
```
