/*
 * @Description: 自定义封装各种工具
 * @Author: LiuZhen
 * @Date: 2018-09-19 09:39:14
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-19 20:27:51
 */

/* 首字母大写 */
export function firstUpperCase(str: string): string {
  return str.replace(/\b[a-z]/g, (s) => s.toUpperCase());
}

/**
 * @description 返回随机字符串，可支持其返回字符串的长度
 * @param {*} len 指定长度，默认32位
 * @returns 随机字符串
 * @author liuzhen
 */
export function getRandomString(len: number): string {
  len = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxLen = $chars.length;
  let randomStr = '';

  for (let i = 0; i < len; i++) {
    randomStr += $chars.charAt(Math.floor(Math.random() * maxLen));
  }

  return randomStr;
}

/**
 * @description 返回插值运算后的url字符串
 * @param {*} url 字符串
 * @param {*} obj 对象或者为null
 * @returns url字符串
 * @author zuozhu
 */
export function populateUrl(url: string, obj?: any): string {
  if (!obj) {
    return url;
  }
  url = url.replace(/\{([\w|\?]+)\}/g, (match, param) => {
    param = /\?$/.test(param) ? param.slice(0, -1) : param;
    return obj[param] !== undefined ? obj[param] : '';
  });

  return url.replace(/\/$/, '');
}

/**
 * @description 包装一些常用的浏览器环境数据
 * @returns 环境数据对象集合
 * @author zuozhu
 */
export function getDimention(): object {
  return {
    w: window.innerWidth,
    h: window.innerHeight,
    dpr: window.devicePixelRatio
  };
}

/**
 * @description 返回单位vw对应的px数值
 * @param {*} vw 数字
 * @returns 实际px的数值
 * @author zuozhu
 */
export function transformVwToPx(vw: number): number {
  return (getDimention() as any).w * vw;
}

/**
 * @desc 对本地存储 WebStorage 进行封装操作，包含设置、读取，删除和清空
 * @param none
 * @return Object
 * @author liuzhen
 */
export const handleWebStorage = {
  // 设置数据
  setLocalData: (key: any, value: any, type: string = 'localStorage') => {
    // 如果value为对象或数组，则进行序列化
    if (Object.prototype.toString.call(value) === '[object Object]' ||
      Object.prototype.toString.call(value) === '[object Array]') {
      value = JSON.stringify(value);
    }

    if (type === 'localStorage') {
      // 如果操作为默认的localStorge
      localStorage.setItem(key, value);
    } else if (type === 'sessionStorage') {
      sessionStorage.setItem(key, value);
    } else {
      throw new Error('params "type" is Error, it must able of "localStorage" or "sessionStorage"');
    }
  },

  // 获取数据
  getLocalData: (key: string, type: any = 'localStorage') => {
    if (type === 'localStorage') {
      const temp: string | null = localStorage.getItem(key);
      if (temp) {
        return JSON.parse(temp);
      }
      // return JSON.parse(localStorage.getItem(key));
    } else if (type === 'sessionStorage') {
      const temp: string | null = sessionStorage.getItem(key);
      if (temp) {
        return JSON.parse(temp);
      }
      // return JSON.parse(sessionStorage.getItem(key): string | null);
    }
  },

  // 删除某条数据
  removeLocalData: (key: string, type = 'localStorage') => {
    if (type === 'localStorage') {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  },

  // 清空数据
  clearLocalData: (type = 'localStorage') => {
    if (type === 'localStorage') {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  },

  // 批量将对象参数中的信息存入本地
  batchSetLocalData: (obj: any, type = 'localStorage') => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      throw new Error('params "obj" must be a Object');
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (type === 'localStorage') {
          localStorage.setItem(key, obj[key]);
        } else {
          sessionStorage.setItem(key, obj[key]);
        }
      }
    }
  }
};

/**
 * @description 获取当前年月日期
 * @return time
 * @author chenmo
 */
export const handleDate = {
  // 获取当前年份
  getCurrentFullYear() {
    return String(new Date().getFullYear());
  },
  // 获取当前月份
  getMonth() {
    const mon = new Date().getMonth() + 1;
    return mon < 10 ? `0${mon}` : String(mon);
  },

  getDay() {
    const day = new Date().getDay();
    return day < 10 ? `0${day}` : String(day);
  },

  getFormatFullDate() {
    return this.getCurrentFullYear() +
           this.getMonth() +
           this.getDay();
  }
};

/**
 * @description 获取url参数
 * @param name string 参数名
 * @return 参数对应value
 * @author chenmo
 */
export function getQueryString(name: any) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * @description 解决ios中键盘弹出 底部按钮隐藏bug
 * @param visible boolean 参数名
 * @return void
 * @author zhegu
 */
export function solveScrollBug(visible: boolean) {
  if (!visible) {
   setTimeout(() => {
       (function smoothscroll() {
         const currentScroll: any = document.body.scrollTop || 0;
         if (currentScroll > 0) {
           window.requestAnimationFrame(smoothscroll);
           window.scrollTo (0, currentScroll - (currentScroll / 5));
         }
       })();
     }, 100);
  }
}

/**
 * @description 用正则判断是否存在class
 * @param el dom
 * @param className class名
 * @return void
 * @author chemo
 */
export function hasClass(el: any, className: any) {
  const reg: any = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * @description 添加class
 * @param el dom
 * @param className class名
 * @return void
 * @author chemo
 */
export function addClass(el: any, className: any) {
  if (hasClass(el, className)) {
    return;
  }
  const newClass: any = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

/**
 * @description post调用支付页面
 * @param url 支付地址
 * @param params 支付参数
 * @return dom
 * @author chemo
 */
export function openPostWindow(url: string, params: any) {
  // 创建form表单
  const tempForm: any = document.createElement('form');
  tempForm.action = url;
  tempForm.target = '_self'; // 打开新窗口
  tempForm.method = 'POST';
  tempForm.style.display = 'none';

  // 添加参数
  for (const i in params) {
    if (params.hasOwnProperty(i)) {   // 这里必须使用 hasOwnProperty 判断元素是否为对象本身的而非继承的
      const opt: any = document.createElement('input');
      opt.name = params[i].param;
      opt.value = params[i].paramValue;
      tempForm.appendChild(opt);
    }
  }
  document.body.appendChild(tempForm);
  // 提交数据
  tempForm.submit();
}

/**
 * @description 返回不同环境下的域名
 * @return string
 * @author zhegu
 */
export function returnDomain() {
  if (process.env.NODE_ENV === 'production' && !process.env.VUE_APP_TEST) {
    return 'https://api-gateway.uoko.com/';
  } else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TEST) {
    return 'http://192.168.200.120:7070/'; // 测试环境
  } else {
    return 'http://' + window.location.host + '/#/'; // mock地址
  }
}
