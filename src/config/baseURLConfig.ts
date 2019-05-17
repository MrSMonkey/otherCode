/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-05-15 16:07:32
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-17 16:23:33
 */

// 根据环境设置应用内部请求的baseURL
let appBaseURL: string = '';

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'production') {  // 生产
  appBaseURL = 'https://api-gateway.uoko.com/';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'test') {  // 测试
  appBaseURL = 'http://api-gateway.testuoko.com/';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'pre-release') {  // pre
  appBaseURL = 'https://api-gateway-pre.uoko.com/';
} else {
  // appBaseURL = 'http://front-end.testuoko.com:3000/mock/22/'; // mock地址
  // appBaseURL = 'http://192.168.200.44:7070/';
  appBaseURL = 'https://api-gateway-pre.uoko.com/';
  // appBaseURL = 'http://api-gateway.testuoko.com/';
  // appBaseURL = 'http://172.16.3.3:7070/';
  // appBaseURL = 'http://172.16.3.103:8008';
}

// 根据环境设置行为信息采集的baseURL
let infoCollectBaseURL: string = '';

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'production') {  // 生产
  infoCollectBaseURL = 'https://api-gateway.uoko.com/';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'test') {  // 测试
  infoCollectBaseURL = 'http://api-gateway.testuoko.com/';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'pre-release') {  // pre
  infoCollectBaseURL = 'http://api-gateway.testuoko.com/';
} else {
  infoCollectBaseURL = 'http://api-gateway.testuoko.com/';
}

export { appBaseURL, infoCollectBaseURL };
