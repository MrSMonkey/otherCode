declare module 'vue-highlight.js';
declare module 'fastclick';
declare module 'echarts/lib/echarts';
declare module 'vue-lazyload';
declare module '@xunlei/vue-lazy-component';
declare module 'better-scroll';

// use json into TypeScript
declare module '*.json' {
  const value: any;
  export default value;
}