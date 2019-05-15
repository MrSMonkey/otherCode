/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-05-15 16:07:32
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-15 16:17:50
 */

// 根据环境设置baseURL
let baseURL: string = '';

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'production') {  // 生产
  baseURL = 'https://api-gateway.uoko.com/';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'test') {  // 测试
  baseURL = 'http://api-gateway.testuoko.com/';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'pre-release') {  // pre
  baseURL = 'https://api-gateway-pre.uoko.com/';
} else {
  // baseURL = 'http://front-end.testuoko.com:3000/mock/22/'; // mock地址
  // baseURL = 'http://192.168.200.44:7070/';
  baseURL = 'http://api-gateway.testuoko.com/';
  // baseURL = 'http://172.16.3.3:7070/';
  // baseURL = 'http://172.16.3.103:8008';
}

export { baseURL };
